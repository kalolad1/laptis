import * as constants from '@/app/constants/endpoints'
import { type Patient } from '@/app/constants/types'

export async function getPatients (): Promise<Patient[]> {
  const fetchData = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  const response = await fetch(constants.GET_PATIENTS_ENDPOINT, fetchData)

  return await response.json()
}
