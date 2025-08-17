import axiosInstance from '../axiosInstance'

const routeService = {
  getAllRouteList: () => {
    return axiosInstance.get('/Route/GetAll')
  },

  getPaginatedRoutes: (pageNumber, pageSize) => {
    return axiosInstance.get(`/Route/?PageNumber=${pageNumber}&PageSize=${pageSize}`)
  },

  getRouteById: (id) => {
    return axiosInstance.get(`/Route/${id}`)
  },

  createRoute: (routeData) => {
    return axiosInstance.post('/Route', routeData)
  },

  updateRoute: (id, routeData) => {
    return axiosInstance.put(`/Route/${id}`, routeData)
  },

  deleteRoute: (id) => {
    return axiosInstance.delete(`/Route/${id}`)
  },
}

export default routeService
