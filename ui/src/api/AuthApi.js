import axios from "axios";
import { getCurrentUser } from "../helpers/UserHelper";

const instance = axios.create({
    baseURL: 'https://localhost:44392/api'
});

instance.interceptors.request.use(
    async config => {
        const user = getCurrentUser()
        config.headers = {
            'Authorization': `Bearer ${user.AccessToken}`,
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

instance.interceptors.response.use(resp => resp, async error => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        const user = getCurrentUser()
        if (user && user.RefreshToken) {
            const response = await instance.post(`/User/refresh?refreshToken=${user.RefreshToken}`);
            console.log(response)
            if (response.status === 200) {
                user.AccessToken = response.data
                localStorage.setItem("userToken", JSON.stringify(user))

                return instance(error.config);
            }
        }
    }
    await Promise.reject(error);
});

export default instance;