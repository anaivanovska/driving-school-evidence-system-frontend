import React from 'react'
import {Roles} from "../../Constants";
import { connect } from 'react-redux';
import pageHOC from "../custom/pageHOC";
import PersonalDataForm from "./PersonalDataForm";

const CreateNewUser = (props) => {

    const {userType, id} = props.match.params;
    if (userType !== Roles.instructor && userType != Roles.candidate) {
        alert("Не постојат корисници од таков тип.")
        props.history.goBack();
    }

    let user = {};
    if (id) {
        const users = userType === Roles.instructor ? props.userList.instructors : props.userList.candidates;
        for (let userTmp of users.content) {

            if (id == userTmp.id) {
                user = userTmp;
                break;
            }
        }
    }



    return (
        <div className="col-6 ml-10 mt-5">
            <PersonalDataForm user={user} userType={userType} goBack={props.history.goBack} goToProfile={(id) => {
                const pathanme = props.location.pathname.replace("new", "");
                props.history.push(pathanme +"/"+id);
            }}/>
        </div>
    );

}
const mapStateToProps = ({userList}) => {
    return {
        userList
    }
};

const CreateNewUserScene = pageHOC(connect(mapStateToProps, null)(CreateNewUser));
export default CreateNewUserScene;