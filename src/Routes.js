import React from 'react';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UserProfile from "./components/userProfile/UserProfile";
import CreateNewCategory from "./components/category/CreateNewCategory";

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path={"/login"} component={LoginPage}/>
            <Route exact path={"/profile"} component={UserProfile}/>
            <Route exact path={"/profile/newCategory"} component={CreateNewCategory}/>
            <Redirect from={"/"} to={"/login"}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;