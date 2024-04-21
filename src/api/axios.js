import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL || "https://srv471383.hstgr.cloud:3000/";
const instance = axios.create({
    
    baseURL : "http://localhost:3000/",
    withCredentials : true,

})


export default instance