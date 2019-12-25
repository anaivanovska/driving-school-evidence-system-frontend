import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import {Roles, SERVER_URL} from "../../Constants";
import { connect } from 'react-redux';
import {fetchUsersWithRoleGroupedByCategory} from "../../actions/user";
import {createNewVehicle} from "../../actions/vehicle";


const initialValues = {
    type: '',
    brand: '',
    registrationNumber: '',
    registrationDate: new Date()
};

const validationSchema = Yup.object().shape({
    type: Yup.string().required('Типот на возилото е задолжително поле'),
    brand: Yup.string().required('Марката на возилото е задолжително поле'),
    registrationNumber: Yup.string().required('Бројот на регистрација е задолжително поле'),
    registrationDate: Yup.string().required('Датата на регистрација е задолжително поле')
});

class CreateNewVehicle extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedCategory: "",
            selectedUser: null
        }
    }

    componentWillMount() {
        this.props.groupUsersWithRoleByCategory(Roles.instructor);
    }

    handleSelectCategory = (value) => {
        this.setState({
            selectedCategory: value
        })
    };

    handleSelectUser = (user) => {
        this.setState({
            selectedUser: user
        })
    };

    handleSubmit = (values) => {
        const vehicle = {...values};
        const {selectedCategory, selectedUser} = this.state;
        vehicle.categoryName = selectedCategory;
        vehicle.instructorId = selectedUser.id
        this.props.createNewVehicle(vehicle);
        this.handleClose()
    };

    getCategories = () => {
        const {usersByCategory} = this.props;

        return (
            <div>
                {Object.keys(usersByCategory).map(key => {
                    return <Form.Check inline label= {key} type="radio" onClick={() => this.handleSelectCategory(key)}/>
                })}
            </div>
        )
    };

    getUsers = () => {
        const {usersByCategory} = this.props;
        const {selectedCategory} = this.state;

        if (selectedCategory !== "") {
            return (
                <div>
                    <p>Инструктори за селектираната категорија </p>
                    {
                        usersByCategory[selectedCategory].map(user => {
                        const fullName = user.firstName + " " + user.lastName;
                            return <Form.Check inline label={fullName} type="radio" onClick={() => this.handleSelectUser(user)}/>
                        })
                    }
                </div>
            )
        }
    }

    handleClose = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton={this.handleClose}>
                    <Modal.Title>Креирај ново возило</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues = {initialValues}
                        onSubmit={this.handleSubmit}
                        validationSchema ={validationSchema}
                        render={(formProps) => {
                            return(
                                <Form onSubmit={formProps.handleSubmit}>
                                    <FormGroup>
                                        <Form.Label>Марка: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="brand"
                                               placeholder="Марка"/>

                                        <ErrorMessage className="text-danger" name="brand" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Тип: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="type"
                                               placeholder="Тип"/>
                                        <ErrorMessage className="text-danger" name="type" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Регистрација: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="registrationNumber"
                                               placeholder="Регистрација"/>
                                        <ErrorMessage className="text-danger" name="registrationNumber" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Дата на регистрација: </Form.Label>
                                        <Field type="date" className="form-control" name="registrationDate" />

                                        <ErrorMessage className="text-danger" name="registrationDate" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                Категорија:
                                                <br/>
                                                {this.getCategories()}
                                            </div>
                                            <div className="col-sm-9">
                                                <br/>
                                                {this.getUsers()}
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="p-3 row justify-content-end">
                                            <Button variant="primary" type="submit">Зачувај</Button>
                                            <Button variant="danger"  onClick={this.handleClose}>Затвори</Button>
                                        </div>
                                    </FormGroup>
                                </Form>);
                        }
                        }
                    />
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        groupUsersWithRoleByCategory: (role) => dispatch(fetchUsersWithRoleGroupedByCategory(role)),
        createNewVehicle:  (vehicle) => dispatch(createNewVehicle(vehicle))
    }
};

const mapStateToProps = ({userList}) => {

    return {
        usersByCategory: userList.usersByCategory
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewVehicle);
