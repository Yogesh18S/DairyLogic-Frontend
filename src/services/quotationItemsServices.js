import axiosInstance from "../axiosInstance"

const quotationItemsService = {
    postQuotationItems :(quotationItems)=>{
        return axiosInstance.post(`/QuotationItems`,quotationItems)
    }
}