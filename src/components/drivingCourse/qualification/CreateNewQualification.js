import React from 'react';
import {Card, Form, FormGroup} from 'react-bootstrap';
import {QUALIFICATION_TYPES} from "../../../Constants";


class CreateNewQualification extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialValues();
    }

    getInitialValues = () => {
        const {qualification} = this.props;
        return {
            startDate: qualification.hasOwnProperty('startDate') ? qualification.startDate : new Date(),
            endDate: qualification.hasOwnProperty('endDate') ? qualification.endDate : new Date(),
            totalHours: qualification.hasOwnProperty('totalHours') ? qualification.totalHours : 0
        }
    };

    setData = () => {
        const {type} = this.props;
        console.log("Set data for type: " + type);
        console.log(this.state)
        const qualification = {...this.state};
        qualification.type = type;
        this.props.setData(qualification);
    };

    setValue = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })

    };


    render() {
        const {type, triggerSet} = this.props;
        const {startDate, endDate, totalHours} = this.state;
        if (triggerSet > 0) {
            this.setData();
        }
        return (
            <Card className="p-3">
                <h5>{type === QUALIFICATION_TYPES[0] ? 'Теоретско' : 'Практично'} Оспособување</h5>
                <Card.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Почеток на оспособување : </Form.Label>
                            <Form.Control type="date"
                                          name="startDate"
                                          value={startDate}
                                          onChange={(event) => this.setValue(event)}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Завршеток на оспособување: </Form.Label>
                            <Form.Control type="date"
                                          name="endDate"
                                          value={endDate}
                                          onChange={(event) => this.setValue(event)}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Вкупен број на часови: </Form.Label>
                            <Form.Control type="text"
                                          name="totalHours"
                                          value={totalHours}
                                          onChange={(event) => this.setValue(event)}/>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>

        )
    }
}

export default CreateNewQualification;