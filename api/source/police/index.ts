import * as Cache from "../cache.ts"
import { request } from "../http.ts"
import { Crime } from "./crime.ts"

export interface GetAggregateOptions {
  year: string
  stadiums: Stadium[]
}

interface Stadium {
  name: string
  latitude: string
  longitude: string
}

interface Aggregate {
  month: string
  numberOfCrimes: number
  stadiumName: string
  latitude: string
  longitude: string
}

export async function getCrimeAggregate(options: GetAggregateOptions): Promise<Aggregate[]> {
  const { year, stadiums } = options
  const aggregates: Aggregate[] = []
  console.log(`Animesh says this is stadiums = ${stadiums}`)
  for (const stadium of stadiums) {
    const promises: Promise<Crime[]>[] = []
    let month = 1

    while (month <= 12) {
      promises.push(getCrimeData({
        date: `${year}-${month < 10 ? '0' + month : month}`,
        latitude: stadium.latitude,
        longitude: stadium.longitude
      }))
      month++
    }

    const crimesByMonth: Crime[][] = await Promise.all(promises)
    crimesByMonth.forEach((crimes, index) => {
      const month = index + 1
      aggregates.push(aggregateCrimes(crimes, `${year}-${month < 10 ? '0' + month : month}`, stadium))
    })
  }
  
  return aggregates
}

interface GetCrimeDataOptions {
  date?: string
  longitude: string
  latitude: string
}

// @TODO: Should rename; very similar to the exported function name
// Maybe makePoliceDataRequest - captures the purpose better
async function getCrimeData(options: GetCrimeDataOptions): Promise<Crime[]> {
  const { date, latitude, longitude } = options
  const endpoint = new URL("https://data.police.uk/api/crimes-at-location?")
  
  if (date) { endpoint.searchParams.set('date', date) }
  endpoint.searchParams.set('lat', latitude)
  endpoint.searchParams.set('lng', longitude)

  const cached = await Cache.fetch(endpoint.search)
  if (cached) {
    console.log("Using cached")
    return JSON.parse(cached)
  }
  
  console.log("Fetching data")
  const data = await request(endpoint)
  await Cache.update(endpoint.search, data)
  return data
}

const aggregateCrimes = (crimes: Crime[], month: string, stadium: Stadium): Aggregate => {
  return {
    month,
    stadiumName: stadium.name,
    latitude: stadium.latitude,
    longitude: stadium.longitude,
    numberOfCrimes: crimes.length
  }
}