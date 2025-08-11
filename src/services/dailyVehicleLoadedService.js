import axiosInstance from "../axiosInstance";

const dailyVehicleLoadedService = {
  getDailyVehicleLoadedList: (page, size) => {
    return axiosInstance.get(`/DailyVehicleLoad/?PageNumber=${page}&PageSize=${size}`);
  },

  getDailyVehicleLoadedById: (id) => {
    return axiosInstance.get(`/DailyVehicleLoad?id=${id}`);
  },

  createDailyVehicleLoaded: (data) => {
    return axiosInstance.post("/DailyVehicleLoad", data);
  },

  updateDailyVehicleLoaded: (id, data) => {
    return axiosInstance.put(`/DailyVehicleLoad?id=${id}`, data);
  },

  deleteDailyVehicleLoaded: (id) => {
    return axiosInstance.delete(`/DailyVehicleLoad?id=${id}`);
  }
};

export default dailyVehicleLoadedService;
