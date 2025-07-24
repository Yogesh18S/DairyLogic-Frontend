import axiosInstance from "../axiosInstance";

const agentlistService ={
    getagentslist: (page, size) => {
        return axiosInstance.get(`/Agent/GetAll?PageNumber=${page}&pageSize=${size}`);
    },

    createagent: (agent) => {
        return axiosInstance.post("/Agent/Post", agent);
    },

    updateagent: (id, agent) => {
        return axiosInstance.put(`/Agent?id=${id}`, agent);
    },

    deleteagent: (id) => {
        return axiosInstance.delete(`/Agent/${id}`);
    },
}
export default agentlistService;