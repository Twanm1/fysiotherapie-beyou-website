export function getAmsterdamDate(date = new Date()) {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' }))
}

export function isPracticeOpen(date = new Date()) {
  const amsterdamTime = getAmsterdamDate(date)
  const day = amsterdamTime.getDay()
  const currentTime = amsterdamTime.getHours() + amsterdamTime.getMinutes() / 60

  if (day >= 1 && day <= 5) {
    return currentTime >= 8 && currentTime < 18
  }

  if (day === 6) {
    return currentTime >= 10 && currentTime < 11.5
  }

  return false
}
