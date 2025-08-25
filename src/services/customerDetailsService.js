import axiosInstance from '../axiosInstance'

const customerDetailsService = {
  getCustomer: (page, size, searchText) => {
    return axiosInstance.get(
      `/CustomerDetails/?PageNumber=${page}&PageSize=${size}&customerName=${searchText}`,
    )
  },

  getCustomerById: (id) => {
    return axiosInstance.get(`/CustomerDetails/${id}`)
  },

  createCustomer: (customer) => {
    return axiosInstance.post('/CustomerDetails/Post', customer)
  },

  updateCustomer: (id, customer) => {
    return axiosInstance.put(`/CustomerDetails/${id}`, customer)
  },

  deleteCustomer: (id) => {
    return axiosInstance.delete(`/CustomerDetails/${id}`)
  },

  getCustomersByRoute: (routeId) => {
    return axiosInstance.get(`/CustomerDetails/GetByRoute/${routeId}`)
  },

  updateDeliveryOrder: (customerSequenceList) => {
    return axiosInstance.put('/CustomerDetails/UpdateDeliveryOrder', customerSequenceList)
  },

  // GetCustomerByRoute: (routeId) => {
  //   return axiosInstance.get(`/CustomerDetails/GetCustomerByRoute/${routeId}`)
  // },
}

export default customerDetailsService
