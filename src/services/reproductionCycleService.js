import axiosInstance from '../axiosInstance'

const reproductionCycleService = {
  // Get all paginated records
  getReproductionCycleList: (page, size) => {
    return axiosInstance.get(`/ReproductionCycle?PageNumber=${page}&PageSize=${size}`)
  },

  // Get all without pagination
  getAllReproductionCycles: () => {
    return axiosInstance.get(`/ReproductionCycle/GetAllAsync`)
  },

  // Get by ID
  getReproductionCycleById: (id) => {
    return axiosInstance.get(`/ReproductionCycle/${id}`)
  },

  // Create
  createReproductionCycle: (data) => {
    return axiosInstance.post('/ReproductionCycle', data)
  },

  // Update
  updateReproductionCycle: (id, data) => {
    return axiosInstance.put(`/ReproductionCycle/${id}`, data)
  },

  // Delete
  deleteReproductionCycle: (id) => {
    return axiosInstance.delete(`/ReproductionCycle/${id}`)
  },

  // Update cycle status
  updateCycleStatus: (data) => {
    return axiosInstance.post(`/ReproductionCycle/UpdateCycleStatus`, data)
  },
}

export default reproductionCycleService
