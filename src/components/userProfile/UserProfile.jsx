import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchUserByUsername} from "../../actions/index";

const UserProfile = (props) => {
    console.log(props)
        return (
            <div>
                {props.user.email}
            </div>
        )
};


const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        user: state.userData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: (username) => dispatch(fetchUserByUsername(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);