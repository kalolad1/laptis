import axios from 'axios'

import * as constants from '@/app/constants/endpoints'
import { type Patient } from '@/app/constants/types'

export async function getPatients (): Promise<Patient[]> {
  const response = await axios.get(constants.GET_PATIENTS_ENDPOINT)
  return response.data
}
