import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/dppa1o6y7/image/upload"
})
axiosApi.interceptors.request.use((req,) => {
    return req;
})

axiosApi.interceptors.response.use((res) => {
    return res;
})