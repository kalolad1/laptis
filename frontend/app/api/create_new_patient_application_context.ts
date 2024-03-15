import * as constants from '@/app/constants/endpoints'
import { type PatientApplicationContext } from '@/app/constants/types'

interface ReturnType {
  patientApplicationContextId: string
}

export async function createNewPatientApplicationContext (patientApplicationContext: PatientApplicationContext): Promise<ReturnType> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }),
    body: JSON.stringify(patientApplicationContext)
  }
  const response = await fetch(constants.CREATE_NEW_PATIENT_APPLICATION_CONTEXT_ENDPOINT, fetchData)

  return await response.json()
}
