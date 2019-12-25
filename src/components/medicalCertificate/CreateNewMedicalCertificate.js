import React from 'react';
import {Card, Form, FormGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewMedicalCertificate} from "../../actions/medicalCertificate";

const initialValues = {
    testNumber: '',
    examinationDate: new Date(),
    points: ''
};

const validationSchema = Yup.object().shape({
    testNumber: Yup.string().required('Бројот на лекарското уверение е задолжителен'),
    examinationDate: Yup.date().required('Датумот на издавање е задолжително поле'),
    points: Yup.string().required('Местото на издавање е задолжително поле')

});

const mapDispatchToProps = (dispatch) => {
    return {
        createNewMedicalCertificate: (medicalCertificate, drivingCourseId) => dispatch(createNewMedicalCertificate(medicalCertificate, drivingCourseId))
    }
};

class CreateNewMedicalCertificate extends React.Component {

    handleSubmit = (values) => {
        const {createNewMedicalCertificate, drivingCourseId} = this.props;
        createNewMedicalCertificate(values, drivingCourseId);
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
                                        <Form.Label>Број на лекарско уверение: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="number"
                                               placeholder="Број на лекарско уверение"/>

                                        <ErrorMessage className="text-danger" name="number" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Датум на издавање: </Form.Label>
                                        <Field className="form-control" type="date"
                                               name="issueDate"
                                               />
                                        <ErrorMessage className="text-danger" name="issueDate" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Место на издавање: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="issuePlace"
                                               placeholder="Место на издавање на лекарско уверение"/>
                                        <ErrorMessage className="text-danger" name="issuePlace" component="div"/>
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

export default connect(null, mapDispatchToProps)(CreateNewMedicalCertificate)