import * as constants from '../constants/endpoints'

interface Center {
  id: string
  name: string
  location: string
  centerType: string
  image: string
}

export async function getCenters (): Promise<Center> {
  const fetchData = {
    method: 'GET'
  }
  const response = await fetch(constants.GET_CENTERS_ENDPOINT, fetchData)

  return await response.json()
}
