import axiosInstance from "../axiosInstance";

const franchiseServices = {
    getfranchise: (page, size) => {
        return axiosInstance.get(`/Franchise?PageNumber=${page}&pageSize=${size}`);
    },

    createfranchise: (franchise) => {
        return axiosInstance.post("/Franchise", franchise);
    },

    updatefranchise: (id, franchise) => {
        return axiosInstance.put(`/Franchise/${id}`, franchise);
    },

    deletefranchise: (id) => {
        return axiosInstance.delete(`/Franchise/${id}`);
    },

    //get franchise specific Item Price
    getFranchiseItems : (franchiseId,search,page,size)=> {
        return axiosInstance.get(`/FranchiseItemPrice/GetFranchiseItem?franchiseId=${franchiseId}&scrapName=${search}&pageNumber=${page}&pageSize=${size}`);
    },
    setCustomPrice: (payload) => {
        return axiosInstance.post(`/FranchiseItemPrice/SetCustomPrice`,payload)
    },
    getFranchiseByUserId: (userId)=>{
        return axiosInstance.get(`/Franchise/GetFranchiseByUserId?userId=${userId}`)
    }
};

export default franchiseServices;