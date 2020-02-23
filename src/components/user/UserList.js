import React from 'react';
import {connect} from 'react-redux';
import {fetchUsersWithRole} from "../../actions/user";
import Pagination from 'react-js-pagination';
import UserRow from './UserRow';
import {DEFAULT_PAGE_SIZE, Roles, SERVER_URL} from "../../Constants";
import '../../style/index.scss';
import {axiosAuthenticated} from "../../service/UserAuthentication";
import pageHOC from "../custom/pageHOC";

const initialState = {
    activePage: 1};

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        this.fetchUsers();
    };

    fetchUsers = () => {
        const role = this.props.match.params.userType;
        const {activePage} = this.state;
        this.props.getUsers(role, activePage - 1);
    };

    handlePageChange = (pageNumber) => {
        if (this.state.activePage != pageNumber) {
            this.setState(
                {
                    activePage: pageNumber
                },
                () => {
                    this.fetchUsers();
                }
            )
        }
    };

    addNewUser = () => {
        const {history, location} = this.props;
        const pathname = location.pathname.replace('all', '');
        history.push(pathname + "new");
    };

    showUserData = (user) => {
       const {history, location} = this.props;
       history.push(location.pathname + "/" + user.id)
    };

    handleRemove = (userId) => {
        axiosAuthenticated().delete(`${SERVER_URL}/api/user/remove/${userId}`)
            .then(response => {
                this.fetchUsers();
            })
            .catch(error => {
                throw(error);
            })
    };

    render() {
        const {activePage} = this.state;
        const {allUsers} = this.props;
        const {role, userType} = this.props.match.params;
        const usersList = userType === Roles.instructor ? allUsers.instructors : allUsers.candidates;
        const {totalElements, content} = usersList;
        return (

            <div className="col-8 ml-10 mt-5">
                <div>
                    <div>
                        {(totalElements === undefined || totalElements === 0) &&
                        <div>
                            Не постојат корисници.
                        </div>
                        }
                        {(totalElements !== undefined && totalElements > 0) &&
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Име</th>
                                <th scope="col">Презиме</th>
                                <th scope="col">Матичен број</th>
                                <th scope="col">Дата на раѓање</th>
                                <th scope="col">Место на раѓање</th>
                                <th scope="col">Место на живеење</th>
                                <th scope="col">Телефонски број</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                content.map(user => {
                                    return (
                                        <UserRow key={user.embg} user={user} handleOnClick={this.showUserData}
                                                 handleRemove={(userId) => this.handleRemove(userId)}/>
                                    );
                                })
                            }
                            </tbody>
                        </table>

                        }
                    </div>
                    <div className="card-footer w-100 row justify-content-between align-items-center">
                        {(totalElements !== undefined && totalElements > 0) &&
                        <Pagination
                            innerClass="custom-pagination col-3"
                            activePage={activePage}
                            onChange={this.handlePageChange}
                            totalItemsCount={totalElements}
                            itemsCountPerPage={DEFAULT_PAGE_SIZE}
                        />}
                        <br/>
                        {role === Roles.admin &&
                        <button className="btn btn-secondary btn-lg h-50px col-1" onClick={() => this.addNewUser()}>
                            Додај</button>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (role, pageNumber) => dispatch(fetchUsersWithRole(role, pageNumber))
    }
};

const mapStateToProps = ({userList}) => {
    return {
        allUsers: userList
    }
};

const UserListScene = pageHOC(connect(mapStateToProps, mapDispatchToProps)(UserList));
export default UserListScene;