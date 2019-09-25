import React, {Component} from 'react';
import {fetchUserByUsername} from "../../actions/index";
import { connect } from 'react-redux';

class UserProfile extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        };
    }

    componentWillMount() {
        const email = this.props.history.location.state;
        const user = this.props.fetchUserData(email);
        this.setState((state, props) => {
            return {user: user};
        });
    }
    render()
    {
        return {

        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: (username) => dispatch(fetchUserByUsername(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);