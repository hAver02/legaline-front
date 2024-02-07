import axios from 'axios'

const instance = axios.create({
    baseURL : "http://85.31.61.130:3000/",
    withCredentials : true
})


export default instance