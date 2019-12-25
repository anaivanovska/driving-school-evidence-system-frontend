import React from 'react';
import {Card, Form, FormGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewQualification} from "../../actions/qualification";
import {QUALIFICATION_TYPES} from "../../Constants";

const initialValues = {
    startDate: new Date(),
    endDate: new Date(),
    totalHours: 0
};


const mapDispatchToProps = (dispatch) => {
    return {
        createNewQualification: (qualification, drivingCourseId) => dispatch(createNewQualification(qualification, drivingCourseId))
    }
};

class CreateNewQualification extends React.Component {

    handleSubmit = (values) => {
        const {createNewQualification, drivingCourseId, type} = this.props;
        const qualification = {...values};
        qualification.type = type;
        createNewQualification(qualification, drivingCourseId);
        this.handleClose()
    };

    handleClose = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <Card>
                <Card.Body>
                    <Formik
                        initialValues = {initialValues}
                        onSubmit={this.handleSubmit}
                        validationSchema ={validationSchema}
                        render={(formProps) => {
                            return(
                                <Form onSubmit={formProps.handleSubmit}>
                                    <FormGroup>
                                        <Form.Label>Почеток на оспособување : </Form.Label>
                                        <Field className="form-control" type="date"
                                               name="startDate"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Завршеток на оспособување: </Form.Label>
                                        <Field className="form-control" type="date"
                                               name="endDate"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Вкупен број на часови: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="totalHours"/>
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
                </Card.Body>
            </Card>

        )
    }
}

export default connect(null, mapDispatchToProps)(CreateNewQualification)