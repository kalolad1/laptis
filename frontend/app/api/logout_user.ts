import axios from 'axios'

import * as constants from '@/app/constants/endpoints'

export async function logoutUser (): Promise<any> {
  const response = await axios.post(constants.LOGOUT_USER)
  return response.data
}
