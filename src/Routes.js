import React from 'react';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UserProfile from "./components/user/UserProfile";
import CreateNewCategory from "./components/category/CreateNewCategory";
import CreateNewUser from "./components/user/CreateNewUser";
import UserData from "./components/user/UserData";
import CreateVehicle from "./components/vehicle/CreateNewVehicle";

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path={"/profile/:role/newCategory"} component={CreateNewCategory}/>
            <Route exact path={"/profile/:role/newVehicle"} component={CreateVehicle}/>
            <Route exact path={"/profile/:role/newUser/:userType"} component={CreateNewUser}/>
            <Route exact path={"/profile/:role"} component={UserProfile}/>
            <Route exact path={"/login"} component={LoginPage}/>
            <Redirect from={"/"} to={"/login"}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;