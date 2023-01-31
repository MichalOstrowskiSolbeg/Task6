import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { checkTextRange } from '../../helpers/ValidationHelpers';
import { register } from '../../api/AuthApiCalls';
import H1 from '../fragments/H1';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                FirstName: '',
                LastName: '',
                Email: '',
                Username: '',
                Password: '',
                Password2: ''
            },
            errors: {
                FirstName: '',
                LastName: '',
                Email: '',
                Username: '',
                Password: '',
                Password2: ''
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
            try {
                await register(this.state.user)
                alert('Account created')
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
        if (fieldName === 'FirstName') {
            if (!checkTextRange(fieldValue, 2, 30)) {
                errorMessage = `This field requires from 2 to 30 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'LastName') {
            if (!checkTextRange(fieldValue, 2, 30)) {
                errorMessage = `This field requires from 2 to 30 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Username') {
            if (!checkTextRange(fieldValue, 2, 30)) {
                errorMessage = `This field requires from 2 to 30 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Email') {
            if (!checkTextRange(fieldValue, 2, 50)) {
                errorMessage = `This field requires from 2 to 50 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password') {
            if (!checkTextRange(fieldValue, 2, 20)) {
                errorMessage = `This field requires from 2 to 20 characters`
            }
            if (!fieldValue) {
                errorMessage = `Required`
            }
        }
        if (fieldName === 'Password2') {
            if (fieldValue !== this.state.user.Password) {
                errorMessage = `Password values should be the same`
            }
            if (!checkTextRange(fieldValue, 2, 20)) {
                errorMessage = `This field requires from 2 to 20 characters`
            }
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
                        htmlFor="FirstName"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        First Name: <span className="symbol-required"> *</span>
                    </label>
                    <input type="text" name="FirstName" id="FirstName" onChange={this.handleChange}
                        placeholder='First Name'
                        className={this.state.errors.FirstName ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorFirstName" className="errors-text">{this.state.errors.FirstName}</span>

                    <label
                        htmlFor="LastName"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7 ">
                        Last Name: <span className="symbol-required"> *</span>
                    </label>
                    <input type="text" name="LastName" id="LastName" onChange={this.handleChange}
                        placeholder='Last Name'
                        className={this.state.errors.LastName ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorLastName" className="errors-text">{this.state.errors.LastName}</span>

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
                        htmlFor="Email"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Email: <span className="symbol-required"> *</span>
                    </label>
                    <input type="text" name="Email" id="Email" onChange={this.handleChange}
                        placeholder='Email'
                        className={this.state.errors.Email ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorEmail" className="errors-text">{this.state.errors.Email}</span>

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

                    <label
                        htmlFor="Password2"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Password: <span
                            className="symbol-required"> *</span>
                    </label>
                    <input type="password" name="Password2" id="Password2" onChange={this.handleChange}
                        placeholder='Retype password'
                        className={this.state.errors.Password2 ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorPassword2" className="errors-text">{this.state.errors.Password2}</span>

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
                                value="Register"
                            />
                            <span id="loginErrors" className="errors-text">{this.state.error}</span>
                        </div>
                    </div>
                </form>
            </>

        return (
            <main>
                <H1 text="Register" />
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

export default withNavigate(withRouter(Register))