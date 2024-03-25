import axios from 'axios'

import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function getCenter (centerId: string): Promise<Center> {
  const response = await axios.get(`${constants.GET_CENTERS_ENDPOINT}/${centerId}`)
  return response.data
}
