import React from 'react';
import {Card, Form, FormGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewTrialTest} from "../../actions/trialTest";

const initialValues = {
    testNumber: '',
    examinationDate: new Date(),
    points: 0
};

const validationSchema = Yup.object().shape({
    testNumber: Yup.string().required('Бројот на пробниот тест е задолжителен'),
    examinationDate: Yup.date().required('Датумот на полагање на пробниот тест е задолжително поле'),
    points: Yup.string().required('Поените се задолжително поле')

});

const mapDispatchToProps = (dispatch) => {
    return {
        createNewQualification: (trialTest, drivingCourseId) => dispatch(createNewTrialTest(trialTest, drivingCourseId))
    }
};

class CreateNewTrialTest extends React.Component {

    handleSubmit = (values) => {
        const {createNewTrialTest, drivingCourseId} = this.props;
        createNewTrialTest(values, drivingCourseId);
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
                                        <Form.Label>Број на пробен тест: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="testNumber"
                                               placeholder="Број на пробен тест"/>

                                        <ErrorMessage className="text-danger" name="testNumber" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Датум на полагање на пробен тест: </Form.Label>
                                        <Field className="form-control" type="date"
                                               name="examinationDate"
                                        />
                                        <ErrorMessage className="text-danger" name="examinationDate" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Освоени поени: </Form.Label>
                                        <Field className="form-control" type="number"
                                               name="points"
                                               placeholder="0"/>
                                        <ErrorMessage className="text-danger" name="points" component="div"/>
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

export default connect(null, mapDispatchToProps)(CreateNewTrialTest)