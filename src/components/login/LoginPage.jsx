import React,{Component} from 'react';
import LoginForm from './LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const LoginPage = (props) => {
    return (
        <div>
            <LoginForm {...props.history}/>
            <br/>
            <Link to='/forgotPassword' className="text-light">Forgot password ? </Link>
        </div>
    )
};

export default LoginPage;