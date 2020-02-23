import React from 'react';
import LoginForm from './LoginForm';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../../index.css'

const LoginPage = (props) => {
    return (
      <div className="w-100 h-100vh row justify-content-center evening-night-gradient">
        <div className="pt-3 card col-3 h-46vh align-self-center">
            <LoginForm {...props.history}/>
            <Link to='/forgotPassword' >Forgot password ? </Link>
        </div>
      </div>
    )
};

export default LoginPage;