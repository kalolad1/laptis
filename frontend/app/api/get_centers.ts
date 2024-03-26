import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'
import { type Center } from '@/app/constants/types'

export async function getCenters (): Promise<Center[]> {
  const response = await axiosInstance.get(constants.GET_CENTERS_ENDPOINT)
  return response.data
}
