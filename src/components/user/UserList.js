import React from 'react';
import {connect} from 'react-redux';
import {fetchUsersWithRole} from "../../actions/user";
import Pagination from 'react-js-pagination';
import UserRow from './UserRow';
import {Card, Modal} from 'react-bootstrap';
import {DEFAULT_PAGE_SIZE, Roles} from "../../Constants";
import '../../style/index.scss';
import UserData from "./UserData";

const initialState = {
    activePage: 1,
    selectedUser: null
};

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = () => {
       this.fetchUsers();
    };

    fetchUsers = () => {
        const {role} = this.props;
        const {activePage} = this.state;
        this.props.getUsers(role.toUpperCase(), activePage - 1);
    };

    handlePageChange = (pageNumber) => {
        if(this.state.activePage != pageNumber) {
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
        const {history, location, role} = this.props;
        history.push(location.pathname + "/newUser/"+role.toLowerCase());
    };

    toggleUserData = (user) => {
        this.setState({
                selectedUser: user
            });
    };

    render() {
        const {activePage, selectedUser} =  this.state;
        const {allUsers, role} = this.props;
        const usersList = role === Roles.instructor ? allUsers.instructors : allUsers.candidates;
        const {totalElements, content} = usersList;
        return (

            <div>
                <Card>
                    <Card.Header>
                        {role === Roles.instructor ? 'Инструктори' : 'Кандидати'}
                    </Card.Header>
                    <Card.Body>
                       {(totalElements === undefined || totalElements === 0) &&
                            <div>
                                Не постојат корисници.
                            </div>
                        }
                        {(totalElements !== undefined && totalElements > 0) &&
                            <table>
                                <thead>
                                <tr>
                                    <td>Име</td>
                                    <td>Презиме</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    content.map(user => {
                                        return (
                                            <UserRow key={user.embg} user={user} handleOnClick={this.toggleUserData}/>
                                        );
                                    })
                                }
                                </tbody>
                            </table>

                        }
                    </Card.Body>
                    <Card.Footer>
                        <Pagination
                            innerClass="custom-pagination"
                            activePage={activePage}
                            onChange={this.handlePageChange}
                            totalItemsCount={totalElements}
                            itemsCountPerPage={DEFAULT_PAGE_SIZE}
                        />
                        <button onClick={() => this.addNewUser()}>Додај</button>
                    </Card.Footer>
                </Card>
                <Modal show={selectedUser != null} onHide={() => this.toggleUserData(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Податоци за корисникот: </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedUser != null && <UserData user={selectedUser}/>}
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);