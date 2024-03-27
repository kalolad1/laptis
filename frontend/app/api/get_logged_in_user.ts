import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'
import { type User } from '@/app/constants/types'

export async function getLoggedInUser (): Promise<User> {
  const response = await axiosInstance.get(constants.GET_LOGGED_IN_USER_ENDPOINT)
  return response.data
}
