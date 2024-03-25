import axiosInstance from './interceptors/interceptor'

import * as constants from '@/app/constants/endpoints'

export async function createApplication (userId: string, patientApplicationContextId: string, centerId: string): Promise<any> {
  const data = { userId, patientApplicationContextId, centerId }

  const response = await axiosInstance.post(constants.CREATE_APPLICATION_ENDPOINT, data)
  return response.data
}
