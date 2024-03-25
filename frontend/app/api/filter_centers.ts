import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function filterCenters (userId: string, patientApplicationContextId: string): Promise<Center[]> {
  const data = { userId, patientApplicationContextId }
  const response = await axiosInstance.post(constants.FILTER_CENTERS_ENDPOINT, data)
  return response.data
}
