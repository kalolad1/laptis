import * as constants from '../constants/endpoints'

export async function getCenters (): Promise<any> {
  const fetchData = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  const response = await fetch(constants.GET_CENTERS_ENDPOINT, fetchData)

  return await response.json()
}
