import axiosInstance from '../axiosInstance';

const customerquotationService = {
  getCustomerQuotation : (franchiseId,page,size) => {
    return axiosInstance.get(`/CustomerQuotation?franchiseId=${franchiseId}&PageNumber=${page}&pageSize=${size}`);
  },
  getCustomerNumber : (number) => {
    return axiosInstance.get(`/Customer/GetByMobile`, {
      params: { number },
    });
  },
  getCustomerQuotationById : (id)=>{
    return axiosInstance.get(`/CustomerQuotation/${id}`)
  },
  createCustomerQuotation: (quotations) => {
    return axiosInstance.post('/CustomerQuotation/Post', quotations);
  },
  updateCustomerQuotation: (id, quotations) => {
    return axiosInstance.put(`/CustomerQuotation/${id}`, quotations);
  },

  deleteCustomerQuotation: (id) => {
    return axiosInstance.delete(`/CustomerQuotation/${id}`);
  },
  updateCustomerQuotation: (id)=>{
    return axiosInstance.update( `/CustomerQuotation/${id}`);
  }
}

export default customerquotationService
