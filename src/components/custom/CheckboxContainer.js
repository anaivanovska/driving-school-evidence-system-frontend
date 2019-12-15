import React from 'react';
import {Form, Button} from 'react-bootstrap'


class CheckboxContainer extends React.Component {

    constructor(props) {
        super(props);
        const {options} = props;
        this.state = {selectedOptions: []};

    }

    handleSelect = selectedOption => {
        const {selectedOptions} = this.state;
        const index = selectedOptions.indexOf(selectedOption);
        if(index === -1) {
            selectedOptions.push(selectedOption);
        } else {
            selectedOptions.splice(index, 1);
        }
        this.setState({selectedOptions});
    };

    render() {
        const {options, save} = this.props;
        const {selectedOptions} = this.state;
        return (
            <div>
                {options.map((option) => {
                    return <Form.Group controlId="formBasicCheckbox" onClick={() => this.handleSelect(option)}>
                                <Form.Check type="checkbox" label={option} />
                            </Form.Group>
                })}
                <Button type="primary" onClick={() => save(selectedOptions)}> Зачувај </Button>
            </div>
        );
    }

}
export default CheckboxContainer;