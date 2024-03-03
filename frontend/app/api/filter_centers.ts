import * as constants from '../constants/endpoints'
import { type Center } from '../constants/types'

export async function filterCenters (patientContext: Record<string, any>): Promise<Center> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify(patientContext)
  }
  const response = await fetch(constants.FILTER_CENTERS_ENDPOINT, fetchData)

  return await response.json()
}
