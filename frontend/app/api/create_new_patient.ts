import * as constants from '@/app/constants/endpoints'

export async function createNewPatient (firstName: string, lastName: string, age: number): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify({ firstName, lastName, age })
  }
  const response = await fetch(constants.CREATE_NEW_PATIENT_ENDPOINT, fetchData)

  return response
}
