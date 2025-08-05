import axiosInstance from "../axiosInstance";

const vehicleService = {
  getAllDriver:() => {
    return axiosInstance.get(`/Vehicle/GetAllAsync`);
  },
  getVehicleList: (page, size) => {
    return axiosInstance.get(`/Vehicle?PageNumber=${page}&PageSize=${size}`);
  },

  getVehicleById: (id) => {
    return axiosInstance.get(`/Vehicle/${id}`);
  },

  createVehicle: (vehicle) => {
    return axiosInstance.post("/Vehicle", vehicle);
  },

  updateVehicle: (id, vehicle) => {
    return axiosInstance.put(`/Vehicle/${id}`, vehicle);
  },

  deleteVehicle: (id) => {
    return axiosInstance.delete(`/Vehicle/${id}`);
  }
};

export default vehicleService;
