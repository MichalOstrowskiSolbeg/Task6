import React, { Component } from 'react';
import {
    Routes,
    Route, BrowserRouter,
} from "react-router-dom";
import Header from './components/fragments/Header';
import Footer from './components/fragments/Footer';
import Home from './components/other/Home';
import Login from './components/other/Login';
import Register from './components/other/Register';
import IncomeList from './components/income/IncomeList';
import IncomeCategoryList from './components/incomeCategory/IncomeCategoryList';
import RequireAuth from './helpers/RequireAuth'
import IncomeCategoryForm from './components/incomeCategory/IncomeCategoryForm';
import IncomeCategoryDelete from './components/incomeCategory/IncomeCategoryDelete';
import ExpenseList from './components/expense/ExpenseList';
import ExpenseCategoryList from './components/expenseCategory/ExpenseCategoryList';
import ExpenseCategoryForm from './components/expenseCategory/ExpenseCategoryForm';
import ExpenseCategoryDelete from './components/expenseCategory/ExpenseCategoryDelete';
import IncomeForm from './components/income/IncomeForm';
import IncomeDelete from './components/income/IncomeDelete';
import ExpenseForm from './components/expense/ExpenseForm';
import ExpenseDelete from './components/expense/ExpenseDelete';
import Statistics from './components/statistics/Statistics';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("userToken", user)
        this.setState({ user: user })
    }

    handleLogout = () => {
        localStorage.removeItem("userToken")
        this.setState({ user: undefined })
    }

    render() {
        return (
            <BrowserRouter>
                <Header handleLogout={this.handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login handleLogin={this.handleLogin} />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/statistics" element={<Statistics />} />

                        <Route path="/income" element={<IncomeList />} />
                        <Route path="/income/add" element={<IncomeForm />} />
                        <Route path="/income/edit/:Id" element={<IncomeForm />} />
                        <Route path="/income/delete/:Id" element={<IncomeDelete />} />

                        <Route path="/income-categories" element={<IncomeCategoryList />} />
                        <Route path="/income-categories/add" element={<IncomeCategoryForm />} />
                        <Route path="/income-categories/edit/:Id" element={<IncomeCategoryForm />} />
                        <Route path="/income-categories/delete/:Id" element={<IncomeCategoryDelete />} />

                        <Route path="/expense" element={<ExpenseList />} />
                        <Route path="/expense/add" element={<ExpenseForm />} />
                        <Route path="/expense/edit/:Id" element={<ExpenseForm />} />
                        <Route path="/income/delete/:Id" element={<ExpenseDelete />} />

                        <Route path="/expense-categories" element={<ExpenseCategoryList />} />
                        <Route path="/expense-categories/add" element={<ExpenseCategoryForm />} />
                        <Route path="/expense-categories/edit/:Id" element={<ExpenseCategoryForm />} />
                        <Route path="/expense-categories/delete/:Id" element={<ExpenseCategoryDelete />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        );
    }
}