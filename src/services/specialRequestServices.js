import axiosInstance from "../axiosInstance"

const specialRequestServices = {

    getPaginatedSpecialRequest: (pageNumber,pageSize)=>{
        return axiosInstance.get(`/SpecialRequest?pageNo=${pageNumber}&pageSize=${pageSize}`)
    },
    getCustomerByName: (customerName)=>{
        return axiosInstance.get(`/CustomerDetails/SearchCustomerByName?keyword=${customerName}`)
    },
    getCustomerByMobile: (mobileNumber) => {
        return axiosInstance.get(`/CustomerDetails/GetByMobile?mobileNumber=${mobileNumber}`)
    },
    postSpecialRequest: (payload)=>{
        return axiosInstance.post('/SpecialRequest',payload)
    },
    getSpecialRequestById: (id)=>{
        return axiosInstance.get(`/SpecialRequest/${id}`)
    }
}

export default specialRequestServices