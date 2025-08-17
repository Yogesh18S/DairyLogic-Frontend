import axiosInstance from '../axiosInstance'

const driverDetailsService = {
  getDriverDetails: (page, size) => {
    return axiosInstance.get(`/DriverDetails/?PageNumber=${page}&PageSize=${size}`)
  },

  getDriverDetailsById: (id) => {
    return axiosInstance.get(`/DriverDetails/${id}`)
  },

  createDriverDetails: (driverDetails) => {
    return axiosInstance.post('/DriverDetails', driverDetails)
  },

  updateDriverDetails: (id, driverDetails) => {
    return axiosInstance.put(`/DriverDetails/${id}`, driverDetails)
  },

  deleteDriverDetails: (id) => {
    return axiosInstance.delete(`/DriverDetails/${id}`)
  },

  toggleIsActive: (id) => {
    return axiosInstance.put(`/DriverDetails/ToggleIsActiveAsync?id=${id}`)
  },
}

export default driverDetailsService
