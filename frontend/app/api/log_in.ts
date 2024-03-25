import axios from 'axios'

import * as constants from '@/app/constants/endpoints'

export async function logIn (email: string, password: string): Promise<any> {
  const data = { email, password }
  const response = await axios.post(constants.LOG_IN, data)
  return response.data
}
