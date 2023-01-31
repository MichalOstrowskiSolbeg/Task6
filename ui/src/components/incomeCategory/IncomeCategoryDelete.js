import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import H1 from "../fragments/H1";
import { deleteIncomeCategory } from "../../api/IncomeCategoryApiCalls";
import { Navigate } from "react-router";

class IncomeCategoryDelete extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.params.Id;

        this.state = {
            redirect: false,
            error: '',
            id: id,
        }
    }

    async componentDidMount() {
        try {
            await deleteIncomeCategory(this.state.id)
        } catch (error) {
            console.log(error)
        }
        this.setState({
            redirect: true
        })
    }

    render() {
        const { redirect } = this.state
        if (redirect) {
            return (
                <Navigate to={{
                    pathname: "/income-categories"
                }} />
            )
        }
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

export default withRouter(IncomeCategoryDelete)