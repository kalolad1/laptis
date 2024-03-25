import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function getCenter (centerId: string): Promise<Center> {
  const response = await axiosInstance.get(`${constants.GET_CENTERS_ENDPOINT}/${centerId}`)
  return response.data
}
