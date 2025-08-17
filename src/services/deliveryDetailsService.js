import axiosInstance from '../axiosInstance'

const deliveryDetailsService = {
  getDeliveryDetail: (page, size) => {
    return axiosInstance.get(`/DeliveryDetails/?PageNumber=${page}&PageSize=${size}`)
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
}

export default deliveryDetailsService
