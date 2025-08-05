import axiosInstance from "../axiosInstance";

const customerDetailsService = {
    getCustomer: (page, size) => {
        return axiosInstance.get(`/CustomerDetails/?PageNumber=${page}&PageSize=${size}`);
    },

    getCustomerById: (id) => {
        return axiosInstance.get(`/CustomerDetails/${id}`);
    },

    createCustomer: (customer) => {
        return axiosInstance.post("/CustomerDetails/PostAsync", customer);
    },

    updateCustomer: (id, customer) => {
        return axiosInstance.put(`/CustomerDetails/${id}`, customer);
    },

    deleteCustomer: (id) => {
        return axiosInstance.delete(`/CustomerDetails/${id}`);
    },
};

export default customerDetailsService;
