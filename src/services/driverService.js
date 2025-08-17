import axiosInstance from '../axiosInstance'

const driverService = {
  getAllDriverList: () => {
    return axiosInstance.get('/Driver/GetAll')
  },
  getDriverList: (page, size) => {
    return axiosInstance.get(`/Driver/?PageNumber=${page}&PageSize=${size}`)
  },

  getDriverById: (id) => {
    return axiosInstance.get(`/Driver/${id}`)
  },

  createDriver: (driver) => {
    return axiosInstance.post('/Driver/Post', driver)
  },

  updateDriver: (id, driver) => {
    return axiosInstance.put(`/Driver?id=${id}`, driver)
  },

  deleteDriver: (id) => {
    return axiosInstance.delete(`/Driver/${id}`)
  },

  toggleIsActive: (id) => {
    return axiosInstance.put(`/Driver/ToggleIsActiveAsync?id=${id}`)
  },
}

export default driverService
