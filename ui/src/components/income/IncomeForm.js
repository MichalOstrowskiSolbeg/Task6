import React from "react";
import FormStatus from "../../helpers/FormStatus"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import H1 from "../fragments/H1";
import { getIncomeDetails, postIncome, putIncome } from '../../api/IncomeApiCalls';
import { checkTextRange } from "../../helpers/ValidationHelpers";
import { getIncomeCategories } from "../../api/IncomeCategoryApiCalls";

class IncomeForm extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.params.Id;
        const mode = id != null ? FormStatus.EDIT : FormStatus.NEW

        this.state = {
            error: '',
            isLoaded: false,
            categories: [],
            data: {
                CategoryId: '',
                Price: 0,
                Comment: '',
                Date: ''
            },
            errors: {
                CategoryId: '',
                Price: '',
                Comment: '',
                Date: ''
            },
            id: this.props.params.Id,
            mode: mode
        }
    }

    async componentDidMount() {
        if (this.state.mode === FormStatus.EDIT) {
            try {
                const res = await getIncomeDetails(this.state.id)
                const res2 = await getIncomeCategories()
                console.log(res)
                this.setState({
                    isLoaded: true,
                    data: res.data,
                    categories: res2.data
                });
            } catch (error) {
                console.log(error)
                this.setState({
                    error: error.message
                });
            }
        } else {
            const res2 = await getIncomeCategories()
            this.setState({
                isLoaded: true,
                categories: res2.data
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
        if (fieldName === 'CategoryId') {
            if (!fieldValue) {
                errorMessage = 'Required'
            }
        }
        if (fieldName === 'Price') {
            if (fieldValue <= 0) {
                errorMessage = `Price must be greater than 0`
            }
            if (!fieldValue) {
                errorMessage = 'Required'
            }
        }
        if (fieldName === 'Date') {
            if (!fieldValue) {
                errorMessage = 'Required'
            }
        }
        if (fieldName === 'Comment') {
            if (fieldValue.length > 150) {
                errorMessage = 'Max 150 characters'
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
                await postIncome(this.state.data)
                navigate(-1, { replace: true })
            } else {
                await putIncome(this.state.data, this.state.id)
                navigate(-1, { replace: true })
            }
        }

        
    }

    render() {
        const { data, mode, isLoaded, error, errors, categories } = this.state
        const pageTitle = mode === FormStatus.NEW ? 'Add income' : `Edit income`
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
                        htmlFor="CategoryId"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Category: <span className="symbol-required"> *</span>
                    </label>
                    <select name="CategoryId" id="CategoryId" onChange={this.handleChange}
                        className={errors.CategoryId ? 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'}>
                        <option value="0">--Select category--</option>
                        {
                            categories.map(x => (
                                <option
                                    selected={x.Id === data.CategoryId}
                                    value={x.Id}>{x.Name}</option>
                            ))}
                    </select>
                    <span id="errorCategoryId" className="errors-text">{errors.CategoryId}</span>

                    <label
                        htmlFor="Price"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Price: <span className="symbol-required"> *</span>
                    </label>
                    <input type="number" name="Price" id="Price" onChange={this.handleChange}
                        placeholder='Price' value={data.Price}
                        className={errors.Price ? 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorPrice" className="errors-text">{errors.Price}</span>

                    <label
                        htmlFor="Date"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Date: <span className="symbol-required"> *</span>
                    </label>
                    <input type="date" name="Date" id="Date" onChange={this.handleChange}
                        placeholder='Date' value={data.Date}
                        className={errors.Date ? 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-red-500 focus:border-red-400 transition duration-500 py-2 px-3'
                            : 'bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 transition duration-500 py-2 px-3'} />
                    <span id="errorDate" className="errors-text">{errors.Date}</span>

                    <label
                        htmlFor="Comment"
                        className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7">
                        Comment:
                    </label>
                    <textarea className="shadow-xl form-textarea block focus:bg-white w-full sm:w-1/2 md:w-1/4" id="Comment"
                        name="Comment" value={data.Comment}
                        rows="4" onChange={this.handleChange} />
                    <span id="errorComment" className="errors-text">{errors.Comment}</span>

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

export default withRouter(IncomeForm);