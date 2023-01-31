import api from "./AuthApi";

export async function getIncome() {
    return await api.get('/Income');
}

export async function getIncomeDetails(id) {
    return await api.get(`/Income/${id}`);
}

export async function postIncome(data) {
    const dataString = JSON.stringify(data)
    return await api.post(`/Income`, dataString);
}

export async function putIncome(data, id) {
    const dataString = JSON.stringify(data)
    return await api.put(`/Income/${id}`, dataString);
}

export async function deleteIncome(id) {
    return await api.delete(`/Income/${id}`);
}