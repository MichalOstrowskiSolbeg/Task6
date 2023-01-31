import axios from "axios";
import { getCurrentUser } from "../helpers/UserHelper";

const instance = axios.create({
    baseURL: 'https://localhost:44392/api'
});

instance.interceptors.request.use(
    async config => {
        const user = getCurrentUser()
        config.headers = {
            'Authorization': `Bearer ${user}`,
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default instance;