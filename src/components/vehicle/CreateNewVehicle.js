import React from 'react';
import {Button, Form, FormGroup} from 'react-bootstrap';
import {ErrorMessage, Field, Formik} from 'formik'
import * as Yup from 'yup';
import {QUALIFICATION_TYPES} from "../../Constants";
import {connect} from 'react-redux';
import {fetchUsersWithRoleGroupedByCategory} from "../../actions/user";
import {createNewVehicle, editVehicle} from "../../actions/vehicle";
import pageHOC from "../custom/pageHOC";


const validationSchema = Yup.object().shape({
    type: Yup.string().required('Типот на возилото е задолжително поле'),
    brand: Yup.string().required('Марката на возилото е задолжително поле'),
    registrationNumber: Yup.string().required('Бројот на регистрација е задолжително поле'),
    registrationDate: Yup.string().required('Датата на регистрација е задолжително поле')
});

class CreateNewVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialValues = () => {
        const vehicle = this.getSelectedVehicle() || {};
        return {
            type: vehicle.type || '',
            brand: vehicle.brand || '',
            registrationNumber: vehicle.registrationNumber || '',
            registrationDate: vehicle.registrationDate || new Date()
        }

    };

    getInitialState = () => {
        const {usersByCategory} = this.props;
        let selectedCategory = "";
        let selectedUser = null;
        if (this.getVehicleId()) {
            const vehicle = this.getSelectedVehicle() || {};
            selectedCategory = vehicle.categoryName;
            for ( let tmpUser of usersByCategory[selectedCategory]) {
                if (tmpUser.id == vehicle.instructorId) {
                    selectedUser = tmpUser;
                    break;
                }
            }
        }

        return {
            selectedCategory,
            selectedUser
        }
    };

    getSelectedVehicle = () => {
        const vehicleId = this.getVehicleId();
        if (vehicleId) {
            const {vehicles} = this.props;
            for (let vehicle of vehicles.content) {
                if (vehicle.id == vehicleId) {
                    return vehicle;
                }
            }
        } else {
            return null;
        }
    };

    getVehicleId = () => {
        return this.props.match.params.id;
    };


    componentWillMount() {

        console.log(this.props);
        const {groupUsersWithRoleByCategory} = this.props;
        groupUsersWithRoleByCategory(QUALIFICATION_TYPES[1]);


    }

    componentDidMount() {
        const {usersByCategory, history} = this.props;

        if (usersByCategory === undefined || Object.keys(usersByCategory).length === 0) {
            alert("Внесете инструктори кои вршат практично оспособување на кандидатот пред да го креирате возилото");
            history.goBack();
        }
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
        vehicle.instructorId = selectedUser.id;
        const vehicleId = this.getVehicleId();
        if (vehicleId) {
            vehicle.id = vehicleId;
            this.props.editVehicle(vehicle);
        } else {
            this.props.createNewVehicle(vehicle);
        }
        this.handleClose()
    };

    getCategories = () => {
        const {selectedCategory} = this.state;
        const {usersByCategory} = this.props;

        return (
            <div>
                {Object.keys(usersByCategory).map(key => {
                    return <Form.Check inline label={key} type="radio" onClick={() => this.handleSelectCategory(key)} checked={key == selectedCategory}/>
                })}
            </div>
        )
    };

    getUsers = () => {
        const {usersByCategory} = this.props;
        const {selectedCategory, selectedUser} = this.state;

        if (selectedCategory !== "") {
            return (
                <div>
                    <p>Инструктори за селектираната категорија </p>
                    {
                        usersByCategory[selectedCategory].map(user => {
                            const fullName = user.firstName + " " + user.lastName;
                            return <Form.Check inline label={fullName} type="radio"
                                               onClick={() => this.handleSelectUser(user)} checked={selectedUser !== null && user.id == selectedUser.id}/>
                        })
                    }
                </div>
            )
        }
    };

    handleClose = () => {
        this.props.history.goBack();
    };

    render() {
        return (
                <Formik
                    initialValues={this.getInitialValues()}
                    onSubmit={this.handleSubmit}
                    validationSchema={validationSchema}
                    render={(formProps) => {
                        return (
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
                                    <Field type="date" className="form-control" name="registrationDate"/>

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
                                        <Button className="btn btn-primary" onClick={formProps.submitForm}>Зачувај</Button>
                                        <Button variant="secondary" onClick={this.handleClose}>Назад</Button>
                                    </div>
                                </FormGroup>
                            </Form>);
                    }
                    }
                />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        groupUsersWithRoleByCategory: (type) => dispatch(fetchUsersWithRoleGroupedByCategory(type)),
        createNewVehicle: (vehicle) => dispatch(createNewVehicle(vehicle)),
        editVehicle: (vehicle) => dispatch(editVehicle(vehicle))
    }
};

const mapStateToProps = ({userList, vehicleList}) => {

    return {
        usersByCategory: userList.usersByCategory,
        vehicles: vehicleList
    }
};

const CreateNewVehicleScene = pageHOC(connect(mapStateToProps, mapDispatchToProps)(CreateNewVehicle));
export default CreateNewVehicleScene;
