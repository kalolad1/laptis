import axios from 'axios'

import * as constants from '@/app/constants/endpoints'

export async function getTypeformResponse (formId: string, responseId: string): Promise<string> {
  const data = { formId, responseId }
  const response = await axios.post(constants.GET_TYPEFORM_RESPONSE_ENDPOINT, data)
  return response.data
}
