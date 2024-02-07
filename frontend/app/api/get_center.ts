import * as constants from '../constants/endpoints'
import { type Center } from '../constants/types'

export async function getCenter (centerId: string): Promise<Center> {
  const fetchData = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  const response = await fetch(constants.GET_CENTERS_ENDPOINT + '/' + centerId, fetchData)

  return await response.json()
}
