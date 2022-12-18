import axios,{AxiosInstance} from "axios";


const axiosInestance = axios.create({
    baseURL:"http://localhost:8080",
})

export default axiosInestance