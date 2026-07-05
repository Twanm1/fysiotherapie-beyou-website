export {}

declare global {
  interface Window {
    google?: {
      maps: {
        places?: {
          PlacesService: new (element: HTMLElement) => {
            getDetails: (
              request: { placeId: string; fields: string[] },
              callback: (result: unknown, status: string) => void
            ) => void
            findPlaceFromQuery: (
              request: { query: string; fields: string[] },
              callback: (results: Array<{ place_id?: string }> | null, status: string) => void
            ) => void
          }
          PlacesServiceStatus: { OK: string }
        }
      }
    }
  }
}
