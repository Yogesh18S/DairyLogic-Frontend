import axiosInstance from "../axiosInstance";

const scrapCategoryService = {
    getScrapCategory : ()=>{
        return axiosInstance.get(`/ItemCategories/GetAll`);
    },
    getScrapCategoryById : (id)=>{
        return axiosInstance.get(`/ItemCategories/${id}`);
    },
    getPaginatedScrapCategory : (page,size)=>{
        return axiosInstance.get(`/ItemCategories?pageNumber=${page}&pageSize=${size}`);
    },
    createScrapCategory : (scrapCategory)=>{
        return axiosInstance.post('/ItemCategories',scrapCategory);
    },
    updateScrapCategory : (id,scrapCategory)=>{
        return axiosInstance.put(`/ItemCategories/${id}` , scrapCategory);
    },
    deleteScrapCategory : (id)=>{
        return axiosInstance.delete(`/ItemCategories/${id}`);
    }
}

export default scrapCategoryService;