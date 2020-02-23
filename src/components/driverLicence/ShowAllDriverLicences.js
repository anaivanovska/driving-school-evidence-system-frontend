import React from 'react';
import {axiosAuthenticated} from "../../service/UserAuthentication";
import {fetchAllDriverLicencesForUser, removeDriverLicenceForUser} from "../../actions/driverLicence";
import { connect } from 'react-redux';
import {Roles, SERVER_URL} from "../../Constants";
import CreteNewDriverLicence from './CreateNewDriverLicence';
import DriverLicenceRow from './DrivierLicenceRow';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDriverLicences : (userId) => dispatch(fetchAllDriverLicencesForUser(userId)),
        removeDriverLicenceForUser: (driverLicenceId) => dispatch(removeDriverLicenceForUser(driverLicenceId))
    }
};

const mapStateToProps = ({driverLicenceForUserList}) => {
    return {
        driverLicences: driverLicenceForUserList
    }
};

class ShowAllDriverLicences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateNewModal: false,
            selectedDriverLicence: {}
        }
    }

    componentWillMount() {
        this.fetchAllDriverLicences();
    }

    fetchAllDriverLicences = () => {
        console.log("PROPS");
        console.log(this.props);
        const {userId, fetchAllDriverLicences} = this.props;
        fetchAllDriverLicences(userId);
    };

    toggleModal = () => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                showCreateNewModal: !prevState.showCreateNewModal
            }
        });
        this.fetchAllDriverLicences();
    };

    handleEdit = (driverLicence) => {
        this.setState({
            selectedDriverLicence:driverLicence,
            showCreateNewModal: true
        })
    };

    handleRemove = (driverLicenceId) => {
        this.props.removeDriverLicenceForUser(driverLicenceId);
    }

    render() {
        const {role, userId, driverLicences} = this.props;
        const {selectedDriverLicence, showCreateNewModal} = this.state;
        return (

            <div className="col-10 ml-6 mt-5">
                <div>
                    <div>
                        {(driverLicences === undefined || driverLicences.length === 0) &&
                        <div>
                            Корисникот не поседува претходни возачки дозволи.
                        </div>
                        }
                        {(driverLicences !== undefined && driverLicences.length > 0) &&
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Категорија</th>
                                <th scope="col">Дата на полагање</th>
                                {role === Roles.admin && <th scope="col"></th>}
                                {role === Roles.admin && <th scope="col"></th>}

                            </tr>
                            </thead>
                            <tbody>
                            {
                                driverLicences.map(driverLicence => {
                                    return (
                                        <DriverLicenceRow key={driverLicence.id} role={role} driverLicence={driverLicence} handleRemove={(driverLicenceId) => this.handleRemove(driverLicenceId)} handleEdit={() => this.handleEdit(driverLicence)}/>
                                    );
                                })
                            }
                            </tbody>
                        </table>

                        }
                    </div>
                    <div className="card-footer w-100 row justify-content-between align-items-center">
                        {role === Roles.admin &&
                        <button className="btn btn-secondary btn-lg h-50px col-1" onClick={() => this.toggleModal()}>
                            Додај</button>}
                    </div>
                </div>
                <CreteNewDriverLicence userId={userId} toggleModal={() => this.toggleModal()} show={showCreateNewModal} driverLicence={selectedDriverLicence}/>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllDriverLicences);