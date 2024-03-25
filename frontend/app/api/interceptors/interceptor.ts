import axios from 'axios'

const axiosInstance = axios.create()

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
  }, function (error) {
    void Promise.reject(error)
  }
)

export default axiosInstance
