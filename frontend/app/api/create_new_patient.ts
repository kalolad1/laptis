import * as constants from '@/app/constants/endpoints'
import { type NewPatientInfo } from '@/app/constants/types'

export async function createNewPatient (newPatientInfo: NewPatientInfo): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify(newPatientInfo)
  }
  const response = await fetch(constants.CREATE_NEW_PATIENT_ENDPOINT, fetchData)

  return response
}
