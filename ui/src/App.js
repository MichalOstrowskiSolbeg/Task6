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
                        <Route path="/income" element={<IncomeList />} />
                        <Route path="/income-categories" element={<IncomeCategoryList />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        );
    }
}
