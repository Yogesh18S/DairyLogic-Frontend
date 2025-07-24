import axiosInstance from "../axiosInstance";

const dashboardService = {
    getOrderCount:(franchiseId)=>{
        return axiosInstance.get(`/Dashboard/GetOrderStats?franchiseId=${franchiseId}`)
    }
}
export default dashboardService