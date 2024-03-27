import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'

export async function signUp (firstName: string, lastName: string, email: string, password: string, userType: string): Promise<any> {
  const data = { firstName, lastName, email, password, userType }
  const response = await axiosInstance.post(constants.SIGN_UP_ENDPOINT, data)
  return response.data
}
