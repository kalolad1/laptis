import axios from 'axios'

import { ACCESS_TOKEN } from '@/app/constants/local_storage'
import { LOGIN_PATH } from '@/app/constants/paths'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT
})

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  function (config) {
    // @ts-expect-error Property 'headers' does not exist on type 'AxiosRequestConfig'
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
    return config
  }, function (error) {
    void Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // TODO: Implement refresh token
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.href = LOGIN_PATH
    }

    return await Promise.reject(error)
  }
)
