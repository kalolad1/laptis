import axios from 'axios'

import { ACCESS_TOKEN } from '@/app/constants/local_storage'
import { LOGIN_PATH } from '@/app/constants/paths'

export const axiosInstance = axios.create()

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  function (config) {
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
