import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'

export async function logoutUser (): Promise<any> {
  const response = await axiosInstance.post(constants.LOGOUT_USER)
  localStorage.clear()
  return response.data
}
