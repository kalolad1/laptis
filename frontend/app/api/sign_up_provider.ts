import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'

export async function signUpProvider (email: string, password: string): Promise<any> {
  const data = { email, password, userType: 'provider' }
  const response = await axiosInstance.post(constants.SIGN_UP_ENDPOINT, data)
  return response.data
}
