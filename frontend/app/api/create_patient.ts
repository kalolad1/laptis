import axiosInstance from '@/app/api/interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'
import { type NewPatientInfo } from '@/app/constants/types'

export async function createPatient (newPatientInfo: NewPatientInfo): Promise<any> {
  const response = await axiosInstance.post(constants.CREATE_PATIENT_ENDPOINT, newPatientInfo)
  return response.data
}
