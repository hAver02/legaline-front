import axios from 'axios'

const instance = axios.create({
    baseURL : "https://srv471383.hstgr.cloud:3000/",
    withCredentials : true
})


export default instance