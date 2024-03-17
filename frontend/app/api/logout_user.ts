import * as constants from '@/app/constants/endpoints'

export async function logoutUser (): Promise<any> {
  const fetchData = {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  const response = await fetch(constants.LOGOUT_USER, fetchData)

  return response
}
