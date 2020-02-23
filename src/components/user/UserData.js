import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Roles} from "../../Constants";
import PersonalDataForm from "./PersonalDataForm";
import Modal from "react-bootstrap/es/Modal";

export class UserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enableDataEdit: false
        }
    }

    toggleDataEdit = (value) => {

        this.setState({
            enableDataEdit: value
        })
    };

    render() {
        const {role, userType, id} = this.props.match.params;
        const user = this.props.user || this.props.currentUser;
        const {enableDataEdit} = this.state;

        return (
            <div className="card">
                <div className="card-body">
                    {user.firstName &&
                    <div className="row">
                        <div className="col-5">
                            Име:
                        </div>
                        <div className="col-5">
                            {user.firstName}
                        </div>
                    </div>
                    }
                    {user.lastName &&
                    <div className="row">
                        <div className="col-5">
                            Презиме:
                        </div>
                        <div className="col-5">
                            {user.lastName}
                        </div>
                    </div>
                    }
                    {user.parentName &&
                    <div className="row">
                        <div className="col-5">
                            Име на родител:
                        </div>
                        <div className="col-5">
                            {user.parentName}
                        </div>
                    </div>
                    }
                    {user.embg &&
                    <div className="row">
                        <div className="col-5">
                            ЕМБГ:
                        </div>
                        <div className="col-5">
                            {user.embg}
                        </div>
                    </div>
                    }
                    {user.gender &&
                    <div className="row">
                        <div className="col-5">
                            Пол:
                        </div>
                        <div className="col-5">
                            {user.gender === 'MALE' ? 'Машки' : 'Женски'}
                        </div>
                    </div>
                    }
                    {user.proffession &&
                    <div className="row">
                        <div className="col-5">
                            Професија:
                        </div>
                        <div className="col-5">
                            {user.proffession}
                        </div>
                    </div>
                    }
                    {user.birthDate &&
                    <div className="row">
                        <div className="col-5">
                            Дата на раѓање:
                        </div>
                        <div className="col-5">
                            {user.birthDate}
                        </div>
                    </div>
                    }
                    {user.birthPlace &&
                    <div className="row">
                        <div className="col-5">
                            Место на раѓање:
                        </div>
                        <div className="col-5">
                            {user.birthPlace}
                        </div>
                    </div>
                    }
                    {user.address &&
                    <div className="row">
                        <div className="col-5">
                            Адреса на живеење:
                        </div>
                        <div className="col-5">
                            {user.address}
                        </div>
                    </div>
                    }
                    {user.email &&
                    <div className="row">
                        <div className="col-5">
                            Емаил адреса:
                        </div>
                        <div className="col-5">
                            {user.email}
                        </div>
                    </div>
                    }
                    {user.phoneNumber &&
                    <div className="row">
                        <div className="col-5">
                            Телефонски број:
                        </div>
                        <div className="col-5">
                            {user.phoneNumber}
                        </div>
                    </div>
                    }
                </div>
                {role === Roles.admin &&
                <div className="card-footer">
                    <Button onClick={() => this.toggleDataEdit(true)} className="btn btn-primary"> Промени ги личните
                        податоци</Button>
                </div>}
                <Modal show={enableDataEdit} onHide={() => this.toggleDataEdit(false)}
                       animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title> Лични податоци на корисникот</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PersonalDataForm user={this.props.user} userType={userType === undefined ? role : userType} goBack={() => {
                            this.props.triggerUpdate();
                            this.toggleDataEdit(false)
                            if (!id) {
                                this.props.history.goBack();
                            }
                        }} goToProfile={() => {
                            this.props.triggerUpdate();
                            this.toggleDataEdit(false)
                            if (!id) {
                                this.props.history.goBack();
                            }
                        }}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = ({userList}) => {
    return {
        currentUser: userList.currentUser
    }
}
export default connect(mapStateToProps, null)(UserData);