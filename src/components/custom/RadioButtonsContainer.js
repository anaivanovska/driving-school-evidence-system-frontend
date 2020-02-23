import React from 'react';
import {Form, Button} from 'react-bootstrap'


const RadioButtonsContainer = ({options, setSelected, name, selected}) => {

    return (
            <div>
                {options.map((option) => {
                    return <Form.Group controlId="formBasicCheckbox" onClick={() => setSelected(option)}>
                        <Form.Check type="radio" label={option} name={name} checked={option == selected}/>
                    </Form.Group>
                })}
            </div>
        );
}
export default RadioButtonsContainer;