import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { login } from '../../api/AuthApiCalls';
import H1 from '../fragments/H1';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                Username: '',
                Password: ''
            },
            errors: {
                Username: '',
                Password: ''
            },
            error: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const user = { ...this.state.user }
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { navigate } = this.props;
        const isValid = this.validateForm()
        if (isValid) {
            console.log(this.state.user)
            try {
                const res = await login(this.state.user)
                const data = await res.data
                console.log(data)
                const userString = JSON.stringify(data)
                console.log(userString)
                this.props.handleLogin(userString)
                navigate("/", { replace: true });
            } catch (error) {
                console.log(error)
                this.setState({
                    error: error.response.data
                })
            }
        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Username') {
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password') {
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }

        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for (const fieldName in user) {
            const fieldValue = user[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const { navigate } = this.props

        const content =
            <>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label
                        htmlFor="Username"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Username: <span className="symbol-required"> *</span>
                    </label>
                    <input type="text" name="Username" id="Username" onChange={this.handleChange}
                        placeholder='Username'
                        className={this.state.errors.Username ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorUsername" className="errors-text">{this.state.errors.Username}</span>

                    <label
                        htmlFor="Password"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Password: <span
                            className="symbol-required"> *</span>
                    </label>
                    <input type="password" name="Password" id="Password" onChange={this.handleChange}
                        placeholder='Password'
                        className={this.state.errors.Password ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorPassword" className="errors-text">{this.state.errors.Password}</span>


                    <div className="md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button">
                                Back
                            </button>
                            <input
                                type="submit"
                                className=" ml-4 shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                value="Login"
                            />
                            <span id="loginErrors" className="errors-text">{this.state.error}</span>
                        </div>
                    </div>
                </form>
            </>

        return (
            <main>
                <H1 text="Login" />
                {content}
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
};

export default withNavigate(withRouter(Login))