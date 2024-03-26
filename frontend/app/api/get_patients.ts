import { axiosInstance } from '@/app/api/axios/instance'
import * as constants from '@/app/constants/endpoints'
import { type Patient } from '@/app/constants/types'

export async function getPatients (): Promise<Patient[]> {
  const response = await axiosInstance.get(constants.GET_PATIENTS_ENDPOINT)
  return response.data
}
