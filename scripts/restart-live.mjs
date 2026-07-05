/**
 * Schone productie-start op poort 3000.
 * Gebruik dit wanneer CSS/JS niet laden (oude .next-cache of verkeerde server).
 */
import { execSync, spawn } from 'child_process'
import fs from 'fs'
import net from 'net'

const PORT = Number(process.env.PORT || 3000)

function killPort(port) {
  try {
    if (process.platform === 'win32') {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' })
      const pids = new Set(
        out
          .split('\n')
          .map((line) => line.trim().split(/\s+/).pop())
          .filter((pid) => pid && /^\d+$/.test(pid) && pid !== '0')
      )
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
          console.log(`Stopped process ${pid} on port ${port}`)
        } catch {
          /* already gone */
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore', shell: true })
    }
  } catch {
    /* port free */
  }
}

function waitForPort(port, timeoutMs = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = net.connect({ port, host: '127.0.0.1' }, () => {
        socket.end()
        resolve()
      })
      socket.on('error', () => {
        if (Date.now() - start > timeoutMs) reject(new Error(`Port ${port} not ready`))
        else setTimeout(tryConnect, 400)
      })
    }
    tryConnect()
  })
}

async function verifyCss(retries = 8) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/diensten`)
      const html = await res.text()
      const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/)
      if (!match) throw new Error('Geen CSS-link in HTML gevonden')
      const css = await fetch(`http://localhost:${PORT}${match[1]}`)
      if (!css.ok) throw new Error(`CSS niet bereikbaar: ${css.status}`)
      console.log('CSS OK:', match[1])
      return
    } catch (err) {
      if (attempt === retries) throw err
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}

console.log(`\n=== BeYou live restart (poort ${PORT}) ===\n`)
killPort(PORT)

if (fs.existsSync('.next')) {
  fs.rmSync('.next', { recursive: true, force: true })
  console.log('Verwijderd: .next cache')
  await new Promise((r) => setTimeout(r, 1500))
}

console.log('Building...')
function runBuild() {
  execSync('npm run build', { stdio: 'inherit' })
}

try {
  runBuild()
} catch {
  console.log('Build mislukt, opnieuw proberen...')
  if (fs.existsSync('.next')) fs.rmSync('.next', { recursive: true, force: true })
  await new Promise((r) => setTimeout(r, 1500))
  runBuild()
}

console.log(`Starting production server on http://localhost:${PORT} ...`)
if (process.platform === 'win32') {
  execSync(`start "BeYou Live" /MIN cmd /c "npx next start -p ${PORT}"`, {
    stdio: 'ignore',
    cwd: process.cwd(),
  })
} else {
  spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'ignore',
    shell: true,
    detached: true,
  }).unref()
}

await waitForPort(PORT)
await new Promise((r) => setTimeout(r, 2000))
await verifyCss()

console.log(`\n✓ Live op http://localhost:${PORT}`)
console.log('  Hard refresh: Ctrl+Shift+R')
console.log('  CSS kapot? Run opnieuw: npm run live\n')
