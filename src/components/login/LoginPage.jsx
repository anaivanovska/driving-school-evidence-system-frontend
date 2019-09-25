import React,{Component} from 'react';
import LoginForm from './LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const LoginPage = (props) => {
    const goToSignIn = () => {
        props.history.push("/signIn")
    };
    return (
        <div>
            <LoginForm {...props}/>
            <br/>
            <Button className="btn btn-light" onClick={goToSignIn}>Sign up </Button>
            <br/>
            <Link to='/forgotPassword' className="text-light">Forgot password ? </Link>
        </div>
    )
};

export default LoginPage;