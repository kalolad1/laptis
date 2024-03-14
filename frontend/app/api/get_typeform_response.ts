import * as constants from '../constants/endpoints'

export async function getTypeformResponse (formId: string, responseId: string): Promise<string> {
  const fetchData = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  const url = `${constants.GET_TYPEFORM_RESPONSE_ENDPOINT}?form_id=${formId}&response_id=${responseId}`
  const response = await fetch(url, fetchData)

  return await response.json()
}
