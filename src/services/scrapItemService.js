import axiosInstance from "../axiosInstance";

const ScrapItemService = {
    getScrapItems: (page, size) => {
        return axiosInstance.get(`/ScrapItem?PageNumber=${page}&pageSize=${size}`);
    },
    getScrapItemsByCategoryId: (categoryId) => {
        return axiosInstance.get(`/ScrapItem/GetItems?itemCategoryId=${categoryId}`);
    },
    createScrapItem: (scrapItem) => {
        return axiosInstance.post("/ScrapItem", scrapItem);
    },

    updateScrapItem: (id, scrapItem) => {
        return axiosInstance.put(`/ScrapItem/${id}`, scrapItem);
    },

    deleteScrapItem: (id) => {
        return axiosInstance.delete(`/ScrapItem/${id}`);
    },
};

export default ScrapItemService;