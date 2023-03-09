import axios from "axios";


const axiosInestance = axios.create({
    baseURL:"http://192.168.31.246:8080",
    withCredentials:true
})


// const axiosUserInestance = axios.create({
//     baseURL:"http://192.168.1.4:8080/user",
//     withCredentials:true
// })



export  {axiosInestance}