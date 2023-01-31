import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router";
import { deleteIncome } from "../../api/IncomeApiCalls";

class IncomeDelete extends React.Component {
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
            await deleteIncome(this.state.id)
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
                    pathname: "/income"
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

export default withRouter(IncomeDelete)