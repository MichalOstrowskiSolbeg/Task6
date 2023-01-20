import api from "./Api";

export async function login(user) {
    const userString = JSON.stringify(user)
    return await api.post('/User/login', userString);
}

export function register(user) {
    const userString = JSON.stringify(user)
    return api.post('/User/register', userString);
}