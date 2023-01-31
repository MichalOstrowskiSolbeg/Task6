import api from "./AuthApi";

export async function getExpenseCategories() {
    return await api.get('/ExpenseCategory');
}

export async function getExpenseCategory(id) {
    return await api.get(`/ExpenseCategory/${id}`);
}

export async function postExpenseCategory(data) {
    return await api.post(`/ExpenseCategory?name=${data}`);
}

export async function putExpenseCategory(data, id) {
    return await api.put(`/ExpenseCategory/${id}?name=${data}`);
}

export async function deleteExpenseCategory(id) {
    return await api.delete(`/ExpenseCategory/${id}`);
}