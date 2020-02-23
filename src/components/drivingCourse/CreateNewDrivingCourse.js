import React from 'react';
import {Card, Form, FormGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchAllInstructorsOfType} from '../../actions/user'
import {fetchAllVehicles} from '../../actions/vehicle'
import {QUALIFICATION_TYPES} from "../../Constants";
import RadioButtonsContainer from "../custom/RadioButtonsContainer";
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


class CreateNewDrivingCourse extends React.Component {

    constructor(props) {
        super(props);
        console.log("Create new driving course45: ");
        console.log(props);

        this.state = {
            vehicle: props.vehicle || null,
            notSelectedVehicle: "Изберете некое од предложените категорија - инструктор - возило",
            lecturer: props.lecturer || null,
            notSelectedLecturer: "Изберете предавач за овој курс",
            ordinalNumber: props.ordinalNumber ||  "",
            emptyOrdinalNumber: "Редниот број е задолжително поле"
        }
    }

    componentWillMount() {
        this.props.fetchAllVehicles();
    };


    getVehiclesToString = () => {
        const {vehicles} = this.props;
        const vehiclesFormated = [];
        if (vehicles !== undefined && vehicles.length > 0) {
            vehicles.forEach(vehicle => {
                vehiclesFormated.push(this.formatVehicle(vehicle));
            });
        }

        return vehiclesFormated;
    };

    getLecturersToString = () => {
        const {lecturers} = this.props;
        const lecturersFormated = [];
        if (lecturers !== undefined && lecturers.length > 0) {
            lecturers.forEach(lecturer => {
                lecturersFormated.push(this.formatLecturer(lecturer));
            });
        }

        return lecturersFormated;
    };

    formatVehicle = (vehicle) => {

        if (vehicle === null) {
            return "";
        }

        return vehicle.categoryName + " " + vehicle.brand + " " + vehicle.type;
    };

    formatLecturer = (lecturer) => {

        if (lecturer === null) {
            return "";
        }

        return lecturer.firstName + " " + lecturer.lastName;
    };

    setOrdinalNumber = (value) => {
        this.setState({
            ordinalNumber: value
        })
    };
    saveVehicle = (selectedVehicle) => {
        const {vehicles} = this.props;
        const index = this.getVehiclesToString().indexOf(selectedVehicle);
        const vehicle = vehicles[index];

        this.setState({
            vehicle
        });

        this.props.fetchAllLecturers(vehicle.categoryName);
    };


    saveLecturer = (selectedLecturer) => {
        const {lecturers} = this.props;
        const index = this.getLecturersToString().indexOf(selectedLecturer);
        const lecturer = lecturers[index];

        this.setState({
            lecturer
        })
    };

    setData = () => {
        console.log("SET drving course base data");
        const {ordinalNumber, vehicle, lecturer} = this.state;
        const data = {
            ordinalNumber: ordinalNumber,
            vehicleId: vehicle !== null ? vehicle.id : "",
            lecturerId: lecturer !== null ? lecturer.id : ""
        }
        this.props.setData(data);
    };

    render() {
        const {vehicle, lecturer, ordinalNumber, notSelectedVehicle, notSelectedLecturer, emptyOrdinalNumber} = this.state;

        return (
            <Card>
                <h3>Основни податоци за курсот </h3>
                <Card.Body>
                    <Form onSubmit={() => this.setData()}>
                        <FormGroup>
                            <Form.Label>Реден број: </Form.Label>
                            <Form.Control className="form-control" type="text"
                                        name="ordinalNumber"
                                          onChange={(event) => this.setOrdinalNumber(event.target.value)}
                            />
                            {ordinalNumber === "" && <Form.Text className="text-danger"> {emptyOrdinalNumber} </Form.Text>}
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Изберете категорија и возило: </Form.Label>
                            <RadioButtonsContainer options={this.getVehiclesToString()}
                                                   setSelected={(selected) => this.saveVehicle(selected)}
                                                   selected={this.formatVehicle(vehicle)}
                                                   name="vehicle"/>
                            {vehicle === null &&
                            <span className="text-danger">{notSelectedVehicle}</span>}
                        </FormGroup>
                        {vehicle !== null &&
                        <FormGroup>
                            <Form.Label>Изберете предавач: </Form.Label>
                            <RadioButtonsContainer options={this.getLecturersToString()}
                                                   setSelected={(selected) => this.saveLecturer(selected)}
                                                   selected={this.formatLecturer(lecturer)}
                                                   name="lecturer"/>
                            {lecturer === null &&
                            <span className="text-danger">{notSelectedLecturer}</span>}
                        </FormGroup>}
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewDrivingCourse)