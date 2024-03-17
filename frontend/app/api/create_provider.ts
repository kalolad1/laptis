import * as constants from '@/app/constants/endpoints'

export async function createProvider (email: string, password: string): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify({ email, password })
  }
  const response = await fetch(constants.CREATE_PATIENT_ENDPOINT, fetchData)

  return response
}
