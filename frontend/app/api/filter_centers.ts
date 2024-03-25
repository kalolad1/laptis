import axios from 'axios'

import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function filterCenters (userId: string, patientApplicationContextId: string): Promise<Center[]> {
  const data = { userId, patientApplicationContextId }
  const response = await axios.post(constants.FILTER_CENTERS_ENDPOINT, data)
  return response.data
}
