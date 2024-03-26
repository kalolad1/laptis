import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/app/constants/local_storage'

export async function logIn (email: string, password: string): Promise<any> {
  const data = { username: email, password }
  const response = await axiosInstance.post(constants.GET_TOKEN_ENDPOINT, data)

  // Initialize the access and refresh tokens in local storage.
  const accessToken = String(response.data.access)
  const refreshToken = String(response.data.refresh)
  localStorage.clear()
  localStorage.setItem(ACCESS_TOKEN, accessToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  return response
}
