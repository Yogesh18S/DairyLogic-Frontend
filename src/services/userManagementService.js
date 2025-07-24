import axiosInstance from "../axiosInstance"

const userManagementService = {
    getUserManagement:(page,size)=>{
        return axiosInstance.get(`/UserManagement?PageNumber=${page}&PageSize=${size}`,)
    },
    postUserManagement: (formData)=>{
        return axiosInstance.post(`/UserManagement`,formData)
    },
    putUserManagement: (id,formData)=>{
        return axiosInstance.put(`/UserManagement/${id}`,formData)
    }
}

export default userManagementService