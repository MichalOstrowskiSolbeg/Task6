import api from "./AuthApi";

export async function getIncomeCategories() {
    return await api.get('/IncomeCategory');
}

export async function getIncomeCategory(id) {
    return await api.get(`/IncomeCategory/${id}`);
}

export async function postIncomeCategory(data) {
    return await api.post(`/IncomeCategory?name=${data}`);
}

export async function putIncomeCategory(data, id) {
    return await api.put(`/IncomeCategory/${id}?name=${data}`);
}

export async function deleteIncomeCategory(id) {
    return await api.delete(`/IncomeCategory/${id}`);
}