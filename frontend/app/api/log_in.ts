import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'

export async function logIn (email: string, password: string): Promise<any> {
  const data = { username: email, password }
  const response = await axiosInstance.post(constants.GET_TOKEN, data)

  // Initialize the access and refresh tokens in local storage.
  const accessToken = String(response.data.access)
  const refreshToken = String(response.data.refresh)
  localStorage.clear()
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  return response
}
