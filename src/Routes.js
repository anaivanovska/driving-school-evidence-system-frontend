import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import CategoryListScene from "./components/category/CategoryList";
import CreateNewCategoryScene from "./components/category/CreateNewCategory";
import VehicleListScene from "./components/vehicle/VehicleList";
import LoginPage from "./components/login/LoginPage";
import UserProfileScene from "./components/user/UserProfile";
import CreateNewUserScene from "./components/user/CreateNewUser";
import ShowUserDataScene from "./components/user/ShowUserData";
import UserListScene from "./components/user/UserList";
import CreateNewVehicleScene from "./components/vehicle/CreateNewVehicle";
import ShowDrivingCoursesPage from './components/drivingCourse/ShowDrivingCourses';

const Routes = () => (
    <BrowserRouter >
        <Switch>
            //Categories
            <Route exact path={"/profile/:role/categories"} component={CategoryListScene}/>
            <Route exact path={"/profile/:role/categories/new"} component={CreateNewCategoryScene}/>
            <Route exact path={"/profile/:role/categories/:id/edit"} component={CreateNewCategoryScene}/>
            //Vehicles
            <Route exact path={"/profile/:role/vehicles"} component={VehicleListScene}/>
            <Route exact path={"/profile/:role/vehicles/new"} component={CreateNewVehicleScene}/>
            <Route exact path={"/profile/:role/vehicles/:id/edit"} component={CreateNewVehicleScene}/>
            //Driving Courses
            <Route exact path={"/profile/:role/:userType/:userId/drivingCourse/all"} component={ShowDrivingCoursesPage}/>
            <Route exact path={"/profile/:role/drivingCourse/all"} component={ShowDrivingCoursesPage}/>
            //Users
            <Route exact path={"/profile/:role/:userType/all"} component={UserListScene}/>
            <Route exact path={"/profile/:role/:userType/new"} component={CreateNewUserScene}/>
            <Route exact path={"/profile/:role/:userType/all/:id"} component={ShowUserDataScene}/>
            <Route exact path={"/profile/:role"} component={UserProfileScene}/>
            <Route exact path={"/login"} component={LoginPage}/>

        </Switch>
    </BrowserRouter>
);

export default Routes;