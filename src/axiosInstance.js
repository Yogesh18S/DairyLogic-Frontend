import axios from 'axios'
import store from './store'

// TODO:
const baseURL = 'https://localhost:7097/api'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Timeout in milliseconds (optional)
})

// Retrieve access token and refresh token from localStorage/sessionStorage or wherever you store them
const getAccessToken = () => localStorage.getItem('access_token')
const getRefreshToken = () => localStorage.getItem('refresh_token')

export const setupInterceptors = (navigate) => {
  // Set the access token in the Authorization header of each request
  axiosInstance.interceptors.request.use(
    (config) => {
      store.dispatch({ type: 'SET_LOADING', payload: true }) // Set loading to true

      const token = getAccessToken()
      if (token && token !== 'null') {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      store.dispatch({ type: 'SET_LOADING', payload: false }) // Stop loading on request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor to handle token expiration and refresh logic
  axiosInstance.interceptors.response.use(
    (response) => {
      store.dispatch({ type: 'SET_LOADING', payload: false }) // Set loading to false when response is received

      // Simply return the response if no error
      return response
    },
    async (error) => {
      store.dispatch({ type: 'SET_LOADING', payload: false }) // Stop loading on error

      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const refreshToken = getRefreshToken()

          if (!refreshToken) {
            navigate('/login') // Redirect using React Router
            return Promise.reject(error)
          }

          // Make a request to refresh the access token
          const response = await axios.post(`${baseURL}/Identity/RefreshToken`, {
            refreshToken,
            accessToken: getAccessToken(),
          })

          const newAccessToken = response.data.result.accessToken
          const newRefreshToken = response.data.result.refreshToken

          // Store the new tokens
          localStorage.setItem('access_token', newAccessToken)
          if (newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken)
          }

          console.log('Access token refreshed.')

          // Update the Authorization header with the new token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          // Retry the original request with the new token
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.log('Unable to refresh access token.')
          navigate('/login') // Redirect using React Router
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )
}

export default axiosInstance
