import React from 'react';
import {Form} from 'react-bootstrap'


const CheckboxContainer  = ({options, save, selected} ) => {

   const handleSelect = selectedOption => {

        let selectedOptions = [...selected];
        if (selectedOptions === undefined) {
            selectedOptions = [];
        }

        const index = selectedOptions.indexOf(selectedOption);
        console.log("Index");
        console.log(index);
        if (index === -1) {
            console.log("prev")
            console.log(selectedOptions)
            selectedOptions.push(selectedOption);
            console.log("Push")
            console.log(selectedOptions)
        } else {
            selectedOptions.splice(index, 1);
        }

        console.log("selected options");
        console.log(selectedOptions);
        save(selectedOptions);
    };

    return (
            <div>
                {options.map((option) => {
                    return <Form.Group controlId="formBasicCheckbox" >
                                <Form.Check type="checkbox" label={option} checked ={selected !== undefined && selected.includes(option)} onChange={() => handleSelect(option)}/>
                            </Form.Group>
                })}
            </div>
    );

};
export default CheckboxContainer;