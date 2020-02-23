import React from 'react';
import {Card, Form, FormGroup} from 'react-bootstrap';


class CreateNewTrialTest extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialValues();
    }

    getInitialValues = () => {
        const {trialTest} = this.props;
        return {
            testNumber: trialTest.hasOwnProperty('testNumber') ? trialTest.testNumber : '',
            examinationDate: trialTest.hasOwnProperty('examinationDate') ? trialTest.examinationDate : new Date(),
            points: trialTest.hasOwnProperty('points') ? trialTest.points : 0
        };
    }

    setValue = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })

    };


    render() {
        const {triggerSet, setData} = this.props;
        const {testNumber, examinationDate, points} = this.state;
        if (triggerSet > 0) {
            setData(this.state);
        }
        return (
            <Card>
                <h5>Пробен тест </h5>
                <Card.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Број на пробен тест: </Form.Label>
                            <Form.Control type="text"
                                          name="testNumber"
                                          value={testNumber}
                                          placeholder="Број на пробен тест"
                                          onChange={(event) => this.setValue(event)}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Датум на полагање на пробен тест: </Form.Label>
                            <Form.Control type="date"
                                          name="examinationDate"
                                          value={examinationDate}
                                          onChange={(event) => this.setValue(event)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Освоени поени: </Form.Label>
                            <Form.Control className="form-control" type="number"
                                          name="points"
                                          value={points}
                                          placeholder="0"
                                          onChange={(event) => this.setValue(event)}
                            />
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>

        )
    }
}

export default CreateNewTrialTest;