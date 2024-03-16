import * as constants from '@/app/constants/endpoints'

export async function createNewApplication (userId: string, patientApplicationContextId: string, centerId: string): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify({ userId, patientApplicationContextId, centerId })
  }
  const response = await fetch(constants.CREATE_NEW_APPLICATION_ENDPOINT, fetchData)

  return await response.json()
}
