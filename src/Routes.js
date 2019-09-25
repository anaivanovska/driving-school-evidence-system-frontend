import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UserProfile from "./components/userProfile/UserProfile";

const Routes = () => {
    return (
        <Router>
            <Route path={"/login"} component={LoginPage}/>
            <Route path={"/profile"} component={UserProfile}/>
            <Redirect from={"/"} to={"/login"}/>
        </Router>
    )
};

export default Routes;