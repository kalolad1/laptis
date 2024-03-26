import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'
import { REFRESH_TOKEN } from '@/app/constants/local_storage'
import { HOME_CENTERS_PATH } from '@/app/constants/paths'

export async function logOutUser (): Promise<any> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  const response = await axiosInstance.post(constants.LOG_OUT_ENDPOINT, { refreshToken })
  localStorage.clear()
  window.location.href = HOME_CENTERS_PATH
  return response
}
