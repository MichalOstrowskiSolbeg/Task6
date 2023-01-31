import React from "react";
import FormStatus from "../../helpers/FormStatus"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import H1 from "../fragments/H1";
import { getIncomeCategory, postIncomeCategory, putIncomeCategory } from "../../api/IncomeCategoryApiCalls";
import { checkTextRange } from "../../helpers/ValidationHelpers";

class IncomeCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.params.Id;
        const mode = id != null ? FormStatus.EDIT : FormStatus.NEW

        this.state = {
            error: '',
            isLoaded: false,
            data: {
                Name: ''
            },
            errors: {
                Name: ''
            },
            id: this.props.params.Id,
            mode: mode
        }
    }

    async componentDidMount() {
        if (this.state.mode === FormStatus.EDIT) {
            try {
                const res = await getIncomeCategory(this.state.id)
                this.setState({
                    isLoaded: true,
                    data: res.data
                });
            } catch (error) {
                console.log(error)
                this.setState({
                    error: error.message
                });
            }
        } else {
            this.setState({
                isLoaded: true
            });
        }

        console.log(this.state.data)
    }


    handleChange = (event) => {
        const { name, value } = event.target
        const data = { ...this.state.data }

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        data[name] = value

        this.setState({
            data: data,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'Name') {
            if (!checkTextRange(fieldValue, 2, 30)) {
                errorMessage = `This field requires from 2 to 30 characters`
            }
            if (!fieldValue) {
                errorMessage = 'Required'
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors
        for (const fieldName in data) {
            const fieldValue = data[fieldName]
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

    handleSubmit = async (event) => {
        const { navigate } = this.props;
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            if (this.state.mode === FormStatus.NEW) {
                await postIncomeCategory(this.state.data.Name)
                navigate(-1, { replace: true })
            } else {
                await putIncomeCategory(this.state.data.Name, this.state.id)
                navigate(-1, { replace: true })
            }
        }
    }

    render() {
        const { data, mode, isLoaded, error, errors } = this.state
        const pageTitle = mode === FormStatus.NEW ? 'Add' : `Edit`
        const { navigate } = this.props
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content =
                <form onSubmit={this.handleSubmit} noValidate>
                    <label
                        htmlFor="Name"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Name: <span className="symbol-required"> *</span>
                    </label>
                    <input type="text" name="Name" id="Name" onChange={this.handleChange}
                        placeholder='Name' value={data.Name}
                        className={errors.Name ? 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorName" className="errors-text">{errors.Name}</span>

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
                                value="Save"
                                className="ml-4 shadow-xl bg-green-500 hover:bg-white  hover:text-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            />
                        </div>
                    </div>
                </form>
        }

        return (
            <main>
                <H1 text={pageTitle} />
                {content}
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
        />
    );
};

export default withRouter(IncomeCategoryForm);