import { jwtDecode } from "jwt-decode";

export const getUserRole = ()=>{
    const token = localStorage.getItem('access_token')
    if(!token) return {roles:[],userId:null};
    try{
        const decoded = jwtDecode(token)
        const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        return {
            roles: Array.isArray(roles) ? roles : [roles], // ensure always an array
            userId: userId
        }

        }catch(err){
        console.log("Token decode error", err)
        return {roles:[],userId: null}
    }
}