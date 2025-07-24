import axiosInstance from "../axiosInstance";

const customerService = {
    getCustomers : (number,page,size)=> {
        return axiosInstance.get(`/Customer?number=${number}&pageNumber=${page}&pageSize=${size}`)
    },
    getByCustomerNumber : (number) => {
        return axiosInstance.get(`/Customer/GetByMobile?number=${number}`
        );
    },
    getCustomerById: (customerId)=>{
        return axiosInstance.get(`/Customer/${customerId}`)
    },
    createCustomerByAdmin:(customerData)=>{
        return axiosInstance.post('/Customer/CreateCustomer',customerData)
    }
}
export default customerService