import React,{Component} from 'react';
import LoginForm from './LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const LoginPage = (props) => {
    return (
      <div className="row justify-content-center align-items-center">
        <div className="card col-4">
            <LoginForm {...props.history}/>
            <br/>
            <Link to='/forgotPassword' >Forgot password ? </Link>
        </div>
      </div>
    )
};

export default LoginPage;