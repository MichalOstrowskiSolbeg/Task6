import api from "./AuthApi";

export async function getExpenses() {
    return await api.get('/Expense');
}

export async function getExpenseDetails(id) {
    return await api.get(`/Expense/${id}`);
}

export async function postExpense(data) {
    const dataString = JSON.stringify(data)
    return await api.post(`/Expense`, dataString);
}

export async function putExpense(data, id) {
    const dataString = JSON.stringify(data)
    return await api.put(`/Expense/${id}`, dataString);
}

export async function deleteExpense(id) {
    return await api.delete(`/Expense/${id}`);
}