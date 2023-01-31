import api from "./AuthApi";

export async function getStats(time) {
    return await api.get(`/Statistics?time=${time}`);
}