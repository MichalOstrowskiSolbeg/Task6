import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { getStats } from '../../api/StatisticsApiCalls';
import H1 from '../fragments/H1';
import Chart2 from './StatsChartGrouped';
import StatsChart from './StatsChart';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: ''
        }
    }

    componentDidMount() {
        this.getStatistics(1)
    }

    async getStatistics(time) {
        try {
            const res = await getStats(time);
            console.log(res.data)
            this.setState({
                data: res.data,
                isLoaded: true
            });
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.getStatistics(value)
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content =
                <div className="">
                    <select
                        name="time" id="time" onChange={this.handleChange}
                        className='bg-white rounded w-full sm:w-1/2 md:w-1/4 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-400 py-2 px-3'>
                        <option value="1" selected={1 === data.time}>This month</option>
                        <option value="2" selected={2 === data.time}>Last month</option>
                        <option value="3" selected={3 === data.time}>This year</option>
                        <option value="4" selected={4 === data.time}>Last year</option>
                        <option value="5" selected={5 === data.time}>All time</option>
                    </select>

                    <div className="w-full border border-gray-400 border-rounded bg-white px-2 my-2">
                        <div className="container w-full flex flex-wrap mx-auto">
                            <div className="lg:w-1/5 leading-normal">
                                <p className="text-xl font-bold my-2 text-center mx-8">Finance chart</p>
                            </div>
                            <div className="lg:w-4/5 leading-normal">
                                <StatsChart income={data.IncomeSum} expense={data.ExpenseSum} />
                            </div>
                        </div>
                        
                    </div>

                    <div className="border border-gray-400 border-rounded bg-white px-2 my-2">
                        <div className="container w-full flex flex-wrap mx-auto">
                            <div className="lg:w-1/5 text-gray-800 leading-normal">
                                <p className="text-xl font-bold my-2 text-center">Incomes</p>
                                <div className="md:flex">
                                    <Link
                                        to={'/income'}
                                        className="shadow-xl w-full text-center bg-blue-400 hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        Go to incomes
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-4/5 leading-normal">
                                <Chart2 data={data.IncomeGrouped} />
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-400 border-rounded bg-white px-2 my-2">
                        <div className="container w-full flex flex-wrap mx-auto">
                            <div className="lg:w-1/5 text-gray-800 leading-normal">
                                <p className="text-xl font-bold my-2 text-center">Expenses</p>
                                <div className="md:flex">
                                    <Link
                                        to={'/expense'}
                                        className="shadow-xl w-full text-center bg-blue-400 hover:bg-white hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                        Go to expenses
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-4/5 leading-normal">
                                <Chart2 data={data.ExpenseGrouped} />
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <main>
                <H1 text="Statistics" />
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

export default withNavigate(withRouter(Statistics))