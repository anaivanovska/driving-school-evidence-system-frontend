import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewCategory} from "../../actions/category";

const initialValues = {
    name: '',
    price: 0
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Името на категоријата е задолжително'),
    price: Yup.number('Цената мора да е составена само од цифри').required('Цената за категоријата е задолжителна')
});

const mapDispatchToProps = (dispatch) => {
    return {
        createNewCategory: (category) => dispatch(createNewCategory(category))
    }
};

class CreateNewCategory extends React.Component {
   handleSubmit = (values) => {
        this.props.createNewCategory(values);
        this.handleClose()
    };

    handleClose = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton={this.handleClose}>
                    <Modal.Title>Креирај нова категорија</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues = {initialValues}
                        onSubmit={this.handleSubmit}
                        validationSchema ={validationSchema}
                        render={(formProps) => {
                            return(
                                <Form onSubmit={formProps.handleSubmit}>
                                    <FormGroup>
                                        <Form.Label>Име: </Form.Label>
                                        <Field className="form-control" type="text"
                                               name="name"
                                               placeholder="Име"/>

                                        <ErrorMessage className="text-danger" name="name" component="div"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Цена: </Form.Label>
                                        <Field className="form-control" type="number"
                                               name="price"
                                               placeholder="Цена"/>
                                        <ErrorMessage className="text-danger" name="price" component="div"/>
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
                </Modal.Body>
            </Modal.Dialog>

        )
    }
}

export default connect(null, mapDispatchToProps)(CreateNewCategory);