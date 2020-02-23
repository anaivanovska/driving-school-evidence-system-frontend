import React from 'react';
import {Card, Form, FormGroup} from 'react-bootstrap';



class CreateNewMedicalCertificate extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialValues();
    }

    getInitialValues = () => {
        const {medicalCertificate} = this.props;
        console.log("Medical certificate")
        console.log(medicalCertificate);
        return {
            number: medicalCertificate.hasOwnProperty('number') ? medicalCertificate.number : '',
            issueDate: medicalCertificate.hasOwnProperty('issueDate') ? medicalCertificate.issueDate : new Date(),
            issuePlace: medicalCertificate.hasOwnProperty('issuePlace')? medicalCertificate.issuePlace : ''
        }
    };

    setValue = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })

    };


    render() {
        const {triggerSet, setData} = this.props;
        const {number, issueDate, issuePlace} = this.state;
        if (triggerSet) {
            setData(this.state);
        }

            return (
                <Card className="p-3">
                    <h5>Медицинско уверение </h5>
                    <Card.Body>
                        <Form>
                            <FormGroup>
                                <Form.Label>Број на лекарско уверение: </Form.Label>
                                <Form.Control type="text"
                                              name="number"
                                              value={number}
                                              placeholder="Број на лекарско уверение"
                                              onChange={(event) => this.setValue(event)}
                                />

                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Датум на издавање: </Form.Label>
                                <Form.Control type="date"
                                              name="issueDate"
                                              value={issueDate}
                                              onChange={(event) => this.setValue(event)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Место на издавање: </Form.Label>
                                <Form.Control className="form-control" type="text"
                                              name="issuePlace"
                                              value={issuePlace}
                                              placeholder="Место на издавање на лекарско уверение"
                                              onChange={(event) => this.setValue(event)}

                                />
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>

            )
        }
}

export default CreateNewMedicalCertificate;