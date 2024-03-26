import axiosInstance from '@/app/api/interceptors/interceptor'

import { type PatientApplicationContext } from '@/app/constants/types'
import * as constants from '@/app/constants/endpoints'

export async function createPatientApplicationContext (patientApplicationContext: PatientApplicationContext): Promise<any> {
  const response = await axiosInstance.post(constants.CREATE_PATIENT_APPLICATION_CONTEXT_ENDPOINT, patientApplicationContext)
  return response.data
}
