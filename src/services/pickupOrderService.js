import qs from 'qs';
import axiosInstance from "../axiosInstance";

const pickupOrderService = {
        getPaginatedOrdersRequest : (franchiseId, page, size, filters = {}) => {
            const queryObj = {
                franchiseId,
                pageNumber: page,
                pageSize: size,
                ...filters,
              };
              // Use qs.stringify with { encode: false } to prevent encoding reserved characters.
              const queryParams = qs.stringify(queryObj, { encode: false });
            return axiosInstance.get(`/PickupRequest/GetAllRequest?${queryParams}`)
        },
        getPickupRequestItems : (id)=>{
            return axiosInstance.get(`/PickupRequest/GetPickupRequestItems?pickupRequestId=${id}`)
        },
        postQuotationRequest : (customerUserId,quotationRequest) =>{
            return axiosInstance.post(`/PickupRequest/QuotationRequest?customerUserId=${customerUserId}`, quotationRequest)
        },
        // deleteOrderRequest
        getPickupRequestStatusHistory : (id)=> {
            return axiosInstance.get(`/PickupRequest/GetStatusHistory?id=${id}`)
        },
        getPickupRequest: (id)=>{
            return axiosInstance.get(`/PickupRequest/Get?pickupRequestId=${id}`)
        },
        scheduleRequest: (pickupRequestId,agentUserId)=>{
            return axiosInstance.put(`/PickupRequest/ScheduleRequest?pickupRequestId=${pickupRequestId}&agentUserId=${agentUserId}`)
        },
        cancelRequest: (pickupRequestId)=>{
            return axiosInstance.put(`/PickupRequest/CancelRequest?pickupRequestId=${pickupRequestId}`)
        }
        
}

export default pickupOrderService;