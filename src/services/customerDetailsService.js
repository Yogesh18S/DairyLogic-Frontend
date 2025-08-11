import axiosInstance from "../axiosInstance";

const customerDetailsService = {
    getCustomer: (page, size) => {
        return axiosInstance.get(`/CustomerDetails/?PageNumber=${page}&PageSize=${size}`);
    },

    getCustomerById: (id) => {
        return axiosInstance.get(`/CustomerDetails/${id}`);
    },

    createCustomer: (customer) => {
        return axiosInstance.post("/CustomerDetails/Post", customer);
    },

    updateCustomer: (id, customer) => {
        return axiosInstance.put(`/CustomerDetails/${id}`, customer);
    },

    deleteCustomer: (id) => {
        return axiosInstance.delete(`/CustomerDetails/${id}`);
    },
    
     getCustomersByRoute: (routeId) => {
    return axiosInstance.get(`/CustomerDetails/GetByRoute/${routeId}`);
  },

  updateDeliveryOrder: (customerSequenceList) => {
    return axiosInstance.put('/CustomerDetails/UpdateDeliveryOrder', customerSequenceList);
  }
};

export default customerDetailsService;
