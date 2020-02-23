import React from 'react';
import {connect} from 'react-redux';
import {Roles, SERVER_URL} from "../../Constants";
import {UserData} from "./UserData";
import CategoriesForInstructor from './CategoriesForInstructor';
import {axiosAuthenticated} from "../../service/UserAuthentication";
import pageHOC from "../custom/pageHOC";
import ShowAllDriverLicences from '../driverLicence/ShowAllDriverLicences';

class ShowUserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }


    componentWillMount() {
        const {userType} = this.props.match.params;
        if (userType != Roles.instructor && userType != Roles.candidate) {
            alert("Не постојат корисници од таков тип.");
            this.props.history.goBack();
        } else {
            this.fetchUser();
        }
    }


    fetchUser = () => {
        const {id} = this.props.match.params;

        axiosAuthenticated().get(`${SERVER_URL}/api/user/${id}`)
            .then(response => {
                this.setState({user: response.data});
            })
            .catch(error => {
                alert("Корисник со ИД " + id + "  не постои");
                throw(error)
            });
    }

    render() {
        const {userType, id, role} = this.props.match.params;
        const {user} = this.state;
        return (
            <div>
                <UserData user={user} {...this.props} triggerUpdate={() => this.fetchUser()}/>
                {Roles.instructor === userType &&
                <CategoriesForInstructor id={id}/>
                }
                {Roles.candidate === userType &&
                <ShowAllDriverLicences userId={id} role={role} />
                }
            </div>
        );
    }
};

const mapStateToProps = ({userList}) => {
    return {
        userList
    }
};


const ShowUserDataScene = pageHOC(connect(mapStateToProps, null)(ShowUserData));

export default ShowUserDataScene;