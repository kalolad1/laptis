import axios from 'axios'

import * as constants from '@/app/constants/endpoints'

export async function createPatientApplicationContext (patientApplicationContext: PatientApplicationContext): Promise<any> {
  const data = { patientApplicationContext }
  const response = await axios.post(constants.CREATE_PATIENT_APPLICATION_CONTEXT_ENDPOINT, data)
  return response.data
}
