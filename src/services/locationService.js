import axiosInstance from "../axiosInstance"

const LocationService = {
    getLocation:()=>{
        return axiosInstance.get('/location')
    },
    postLocationRequest : (Location)=>{
        return axiosInstance.post('/Location',Location)
    },
    postUserLocationHistory: (Location,CustomerId)=>{
        return axiosInstance.post('/Location/UserLocationHistory',Location,CustomerId)
    }
}

export default LocationService