import axios from 'axios'

import * as constants from '@/app/constants/endpoints'
import { type Centers } from '@/app/constants/types'

export async function getCenters (): Promise<Centers[]> {
  const response = await axios.get(constants.GET_CENTERS_ENDPOINT)
  return response.data
}
