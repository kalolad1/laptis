import axios from 'axios'

import * as constants from '@/app/constants/endpoints'

export async function signUpProvider (email: string, password: string): Promise<any> {
  const data = { email, password, userType: 'provider' }
  const response = await axios.post(constants.SIGN_UP, data)
  return response.data
}
