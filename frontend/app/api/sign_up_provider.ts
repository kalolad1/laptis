import * as constants from '@/app/constants/endpoints'

export async function signUpProvider (email: string, password: string): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify({ email, password, userType: 'provider' })
  }
  const response = await fetch(constants.SIGN_UP, fetchData)

  return response
}
