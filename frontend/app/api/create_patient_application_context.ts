import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'

export async function createPatientApplicationContext (patientApplicationContext: PatientApplicationContext): Promise<any> {
  const data = { patientApplicationContext }
  const response = await axiosInstance.post(constants.CREATE_PATIENT_APPLICATION_CONTEXT_ENDPOINT, data)
  return response.data
}
