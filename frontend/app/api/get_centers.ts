import * as constants from '../constants/endpoints'
import { type Center } from '../constants/types'

export async function getCenters (): Promise<Center> {
  const fetchData = {
    method: 'GET'
  }
  const response = await fetch(constants.GET_CENTERS_ENDPOINT, fetchData)

  return await response.json()
}
