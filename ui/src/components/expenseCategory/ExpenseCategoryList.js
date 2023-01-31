import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { getExpenseCategories } from '../../api/ExpenseCategoryApiCalls';
import H1 from '../fragments/H1';
import ExpenseCategoryListTable from './ExpenseCategoryListTable';

class ExpenseCategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: ''
        }
    }

    async componentDidMount() {
        try {
            const res = await getExpenseCategories();
            this.setState({
                data: res.data,
                isLoaded: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { error, isLoaded, data } = this.state
        const { navigate } = this.props
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <ExpenseCategoryListTable data={data} />
        }

        return (
            <main>
                <H1 text="Expense categories" />
                <p>List of your categories</p>
                {content}
                <div className="md:flex mb-6 mt-8 ">
                    <div className="flex pb-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button">
                            Back
                        </button>
                        <Link
                            to={'/expense-categories/add'}
                            className="ml-4 shadow-xl bg-green-500 hover:bg-white  hover:text-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Add
                        </Link>
                    </div>
                </div>
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

export default withNavigate(withRouter(ExpenseCategoryList))