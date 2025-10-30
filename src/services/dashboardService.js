import axiosInstance from '../axiosInstance'

const dashboardService = {
  getOrderCount: () => {
    return axiosInstance.get(`/Dashboard/GetOrderStats`)
  },
  getAnimalTracker: () => {
    return axiosInstance.get(`/Dashboard/GetAnimaltrack`)
  },
  getSpecialRequests: () => {
    return axiosInstance.get(`/Dashboard/GetSpecialTrack`)
  },
}
export default dashboardService