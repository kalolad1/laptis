import axios from 'axios'

import { ACCESS_TOKEN } from '@/app/constants/local_storage'

const axiosInstance = axios.create()

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    return config
  }, function (error) {
    void Promise.reject(error)
  }
)

export default axiosInstance
