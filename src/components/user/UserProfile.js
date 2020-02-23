import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../index.css'
import UserData from "./UserData";
import pageHOC from "../custom/pageHOC";

const UserProfile = (props) => {

    return (
        <div className="col-6 ml-10 mt-5">
            <UserData {...props} />
        </div>
    )
}

const UserProfileScene = pageHOC(UserProfile);
export default UserProfileScene;