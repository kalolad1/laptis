import axios from 'axios'

import * as constants from '@/app/constants/endpoints'
import { type NewPatientInfo } from '@/app/constants/types'

export async function createPatient (newPatientInfo: NewPatientInfo): Promise<any> {
  const data = { newPatientInfo }
  const response = await axios.post(constants.CREATE_PATIENT_ENDPOINT, data)
  return response.data
}
