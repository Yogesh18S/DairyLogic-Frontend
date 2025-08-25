import axiosInstance from '../axiosInstance'

const deliveryDetailsService = {
  // getDeliveryDetail: (page, size) => {
  //   return axiosInstance.get(`/DeliveryDetails/?PageNumber=${page}&PageSize=${size}`)
  // },
  // deliveryDetailsService.js
  getDeliveryDetail: (page, size, filters = {}) => {
    console.log(filters)
    const { customerName, routeName, status, date } = filters

    let query = `/DeliveryDetails/?PageNumber=${page}&PageSize=${size}`

    if (customerName) query += `&customerName=${encodeURIComponent(customerName)}`
    if (routeName) query += `&routeName=${encodeURIComponent(routeName)}`
    if (status) query += `&status=${encodeURIComponent(status)}`
    if (date) query += `&date=${date}` // date as yyyy-MM-dd

    return axiosInstance.get(query)
  },

  getDeliveryDetailsById: (id) => {
    return axiosInstance.get(`/DeliveryDetails/${id}`)
  },

  createDeliveryDetails: (data) => {
    return axiosInstance.post('/DeliveryDetails', data)
  },

  updateDeliveryDetails: (id, data) => {
    return axiosInstance.put(`/DeliveryDetails/${id}`, data)
  },

  deleteDeliveryDetails: (id) => {
    return axiosInstance.delete(`/DeliveryDetails/${id}`)
  },
  searchRouteData: (routeId, customerId, month, year) => {
    return axiosInstance.get(
      `/DeliveryDetails/GetPersonCalendar?routeId=${routeId}&customerId=${customerId}&month=${month}&year=${year}`,
    )
  },
}

export default deliveryDetailsService
