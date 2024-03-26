import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function filterCenters (userPatientId: string, patientApplicationContextId: string): Promise<Center[]> {
  const data = { userPatientId, patientApplicationContextId }
  const response = await axiosInstance.post(constants.FILTER_CENTERS_ENDPOINT, data)
  return response.data
}
