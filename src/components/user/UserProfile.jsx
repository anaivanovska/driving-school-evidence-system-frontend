import  React from 'react';
import { connect } from 'react-redux';
import {fetchUserByUsername} from "../../actions/user";
import CategoryList from "../category/CategoryList";
import UserList from "./UserList";
import UserData from "./UserData"
import {Roles} from "../../Constants";
import VehicleList from "../vehicle/VehicleList";

const UserProfile = ({location, history, user}) => {
        return (
            <div className="row">
                <div className="col-4">
                    <UserData user={user} />
                </div>
                <div className="col-4">
                    <CategoryList {...history}/>
                    <UserList role={Roles.instructor} history={history} location={location} />
                    <VehicleList {...history} />
                </div>
    </div>)
};


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(UserProfile);