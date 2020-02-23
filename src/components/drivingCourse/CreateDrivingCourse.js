import React from 'react';
import '../../style/index.scss'
import {MODAL_ADD, MODAL_EDIT, QUALIFICATION_TYPES, SERVER_URL} from "../../Constants";
import {axiosAuthenticated} from "../../service/UserAuthentication";
import {Button, FormGroup} from "react-bootstrap";
import RadioButtonsContainer from "../custom/RadioButtonsContainer";
import Form from "react-bootstrap/es/Form";
import Card from "react-bootstrap/es/Card";
import {connect} from "react-redux";
import {fetchAllInstructorsOfType} from "../../actions/user";
import {fetchAllVehicles} from "../../actions/vehicle";
import CreateNewMedicalCertificate from "./medicalCertificate/CreateNewMedicalCertificate";
import CreateNewQualification from "./qualification/CreateNewQualification";
import CreateNewTrialTest from "./trialTest/CreateNewTrialTest";

const mapDispatchToProps = (dispatch) => {

    return {
        fetchAllLecturers: (categoryName) => dispatch(fetchAllInstructorsOfType(QUALIFICATION_TYPES[0], categoryName)),
        fetchAllVehicles: () => dispatch(fetchAllVehicles())
    }
};

const mapStateToProps = ({userList, vehicleList}) => {
    return {
        lecturers: userList.instructorsOfType,
        vehicles: vehicleList.list
    }
}

class CreateDrivingCourse extends React.Component {

    constructor(props) {
        super(props);
        const {drivingCourse} = props;
        console.log("DRIVING COURSE DATA: ");
        console.log(drivingCourse);
        this.state = {
            ordinalNumber: drivingCourse.ordinalNumber || "",
            emptyOrdinalNumber: "Редниот број е задолжително поле",
            vehicle: drivingCourse.vehicle || null,
            notSelectedVehicle: "Изберете некое од предложените категорија - инструктор - возило",
            lecturer:drivingCourse.lecturer || null,
            notSelectedLecturer: "Изберете предавач за овој курс",
            medicalCertificate: drivingCourse.medicalCertificate || {},
            shouldTriggerMedicalCertificate: false,
            qualifications: drivingCourse.qualifications || [],
            numberOfQualificationsToSet: 0,
            trialTests: drivingCourse.trialTests ||  [],
            numberOfTrialTestsToSet: 0,
            submitIsTriggered: false
        };
    }

    componentWillMount() {
        this.props.fetchAllVehicles();
    }


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

    setVehicle = (selectedVehicle) => {
        const {vehicles} = this.props;
        const index = this.getVehiclesToString().indexOf(selectedVehicle);
        const vehicle = vehicles[index];

        this.setState({
            vehicle
        });

        this.props.fetchAllLecturers(vehicle.categoryName);
    };


    setLecturer = (selectedLecturer) => {
        const {lecturers} = this.props;
        const index = this.getLecturersToString().indexOf(selectedLecturer);
        const lecturer = lecturers[index];

        this.setState({
            lecturer
        })
    };


    setMedicalCertificate = (medicalCertificate) => {
        console.log("Set medical certificate: ");
        console.log(medicalCertificate);
        this.setState({
            medicalCertificate: medicalCertificate,
            shouldTriggerMedicalCertificate: false
        })
    };

    setQualification = (qualification) => {
        console.log("SHOULD SET QUALIFICATION");
        console.log(qualification);
        console.log(this.state.numberOfQualificationsToSet);
        this.setState((prevState, props) => {
            const prevQualifications = prevState.qualifications;
            return {
                ...prevState,
                qualifications: [...prevQualifications, qualification],
                numberOfQualificationsToSet: prevState.numberOfQualificationsToSet - 1
            }
        });
    };

    setTrialTest = (trialTest) => {
        this.setState((prevState, props) => {
            const prevTrialTests = prevState.trialTests;
            return {
                ...prevState,
                trialTests: [...prevTrialTests, trialTest],
                numberOfTrialTestsToSet: prevState.numberOfTrialTestsToSet - 1
            }
        });
    };


    triggerSetData = () => {
        this.setState({
            shouldTriggerMedicalCertificate: true,
            numberOfQualificationsToSet: 2,
            numberOfTrialTestsToSet: 1,
            submitIsTriggered: true,
            medicalCertificate: null,
            qualifications: [],
            trialTests: []
        })
    };

    saveDrivingCourse = () => {
        const {userId, type} = this.props;
        let url = SERVER_URL+"/api/drivingCourse/";
        if (MODAL_ADD === type) {
            url += "new/"+userId;
        } else {
            url += "edit"
        }

        axiosAuthenticated().post(`${url}`, this.createResponse())
            .then(response => {
                console.log("Create - edit driving course");
                console.log(response);
                this.props.close();
            })
            .catch(error => {
                throw(error)
                this.props.close();
            });
    };

    componentDidUpdate = () => {
        const {submitIsTriggered, shouldTriggerMedicalCertificate, numberOfQualificationsToSet, numberOfTrialTestsToSet} = this.state;
        if (submitIsTriggered && !shouldTriggerMedicalCertificate && numberOfTrialTestsToSet==0 && numberOfQualificationsToSet==0) {
            this.saveDrivingCourse();
        }
    };

    createResponse = () => {
        const {drivingCourse, type} = this.props;
        const {ordinalNumber, vehicle, lecturer, medicalCertificate, qualifications, trialTests} = this.state;
        const response = {
            ordinalNumber: ordinalNumber,
            vehicleId: vehicle.id,
            lecturerId: lecturer.id,
            medicalCertificate: medicalCertificate,
            qualifications: qualifications,
            trialTests: trialTests
        };

        if (MODAL_EDIT === type) {
            response.id = drivingCourse.id;
            const {medicalCertificate, qualifications, trialTests} = drivingCourse;
            response.medicalCertificate.id = medicalCertificate.id;
            for (let i=0; i<qualifications.length; i++) {
                response.qualifications[i].id = qualifications[i].id;
            }
            for (let j=0; j<trialTests.length; j++) {
                response.trialTests[j].id = trialTests[j].id;
            }
        }

        return response;
    }

    render() {
        const {ordinalNumber, vehicle, medicalCertificate, qualifications, trialTests, lecturer, emptyOrdinalNumber, notSelectedVehicle, notSelectedLecturer, shouldTriggerMedicalCertificate, numberOfQualificationsToSet, numberOfTrialTestsToSet} = this.state;
        const theoreticalQualification = qualifications.length >= 1 ? qualifications[0] : {};
        const practicalQualification = qualifications.length === 2 ? qualifications[1] : {};
        const trialTest = trialTests.length >= 1 ? trialTests[0] : {};
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h5>Основни податоци за курсот </h5>
                        <Card.Body>
                            <Form>
                                <FormGroup>
                                    <Form.Label>Реден број: </Form.Label>
                                    <Form.Control className="form-control" type="text"
                                                  name="ordinalNumber"
                                                  value={ordinalNumber}
                                                  onChange={(event) => this.setOrdinalNumber(event.target.value)}
                                    />
                                    {ordinalNumber === "" &&
                                    <Form.Text className="text-danger"> {emptyOrdinalNumber} </Form.Text>}
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>Изберете категорија и возило: </Form.Label>
                                    <RadioButtonsContainer options={this.getVehiclesToString()}
                                                           setSelected={(selected) => this.setVehicle(selected)}
                                                           selected={this.formatVehicle(vehicle)}
                                                           name="vehicle"/>
                                    {ordinalNumber !== "" && vehicle === null &&
                                    <span className="text-danger">{numberOfTrialTestsToSet}</span>}
                                </FormGroup>
                                {vehicle !== null &&
                                <FormGroup>
                                    <Form.Label>Изберете предавач: </Form.Label>
                                    <RadioButtonsContainer options={this.getLecturersToString()}
                                                           setSelected={(selected) => this.setLecturer(selected)}
                                                           selected={this.formatLecturer(lecturer)}
                                                           name="lecturer"/>
                                    {vehicle !== null && lecturer === null &&
                                    <span className="text-danger">{notSelectedLecturer}</span>}
                                </FormGroup>}
                            </Form>
                        </Card.Body>
                    </div>
                    <div className="col-6">
                        <CreateNewMedicalCertificate medicalCertificate={medicalCertificate} setData={this.setMedicalCertificate}
                                                     triggerSet={shouldTriggerMedicalCertificate}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <CreateNewQualification qualification={theoreticalQualification}
                                                type={QUALIFICATION_TYPES[0]} triggerSet={numberOfQualificationsToSet}
                                                setData={this.setQualification}/>
                    </div>
                    <div className="col-6">
                        <CreateNewQualification qualification={practicalQualification}
                                                type={QUALIFICATION_TYPES[1]} triggerSet={numberOfQualificationsToSet}
                                                setData={this.setQualification}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <CreateNewTrialTest trialTest={trialTest}
                                            triggerSet={numberOfTrialTestsToSet}
                                            setData={this.setTrialTest}/>
                    </div>
                </div>
                <Button type="submit" onClick={this.triggerSetData}>Зачувај</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDrivingCourse)