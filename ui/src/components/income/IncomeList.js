import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { getIncome } from '../../api/IncomeApiCalls';
import H1 from '../fragments/H1';
import IncomeListTable from './IncomeListTable';

class IncomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            page: 1,
            error: ''
        }
    }

    componentDidMount() {
        this.getData(this.state.page)
    }

    async getData(page) {
        try {
            const res = await getIncome(page);
            this.setState({
                data: res.data,
                isLoaded: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    changePage = (page) => {
        this.getData(page)
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
            content = <IncomeListTable data={data} changePage={this.changePage} />
        }

        return (
            <main>
                <H1 text="Incomes" />
                <p>List of your incomes</p>
                <div className="md:flex mb-6 mt-8 ">
                    <div className="flex pb-3">
                        <Link
                            to={'/income-categories'}
                            className="shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"                >
                            Go to income categories
                        </Link>
                    </div>
                </div>
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
                            to={'/income/add'}
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

export default withNavigate(withRouter(IncomeList))