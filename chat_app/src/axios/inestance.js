import axios from "axios";


const axiosInestance = axios.create({
    baseURL:"http://192.168.1.4:8080",
})

export default axiosInestance