import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { getIncome } from '../../api/IncomeApiCalls';
import H1 from '../fragments/H1';

class IncomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: ''
        }
    }

    componentDidMount() {
        try {
            const res = await getIncome();
            this.setState({
                data: res.data
            });
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        const { error, isLoaded, data } = this.state
        let content;

        if (error) {
            content = <p>Error: {error}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            //content = <ProductListTable data={data} />
        }

        return (
            <main>
                <H1 text="Incomes" />
                <p>List of your incomes</p>
                <Link to={'/income-categories'}></Link>
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

export default withNavigate(withRouter(IncomeList))