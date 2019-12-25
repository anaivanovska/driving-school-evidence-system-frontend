import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewDriverLicence} from "../../actions/driverLicence";
import {fetchAllCategories} from "../../actions/category";

const initialValues = {
    examinationDate: new Date()
};

const validationSchema = Yup.object().shape({
    examinationDate: Yup.date().required('Датумот на возачката дозвола е задолжително поле')
});

const mapDispatchToProps = (dispatch) => {
    return {
        createNewDriverLicence: (driverLicence) => dispatch(createNewDriverLicence(driverLicence)),
        fetchAllCategories: () => dispatch(fetchAllCategories())
    }
};

const mapStateToProps = ({categoryList}) => {
    const categoryNames = categoryList.map(category => category.name);
    return {
        categories: categoryNames
    }
};

class CreateNewDriverLicence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: '',
            categoryErrorText: 'Изборот на категоријата е задолжителен',
            showError: false
        };
    }

    componentWillMount = () => {
        this.props.fetchAllCategories();
    };

    handleSubmit = (values) => {
        const driverLicence = {...values};
        const {categoryName}  = this.state;
        if (categoryName === '') {
            this.setState({ showError: true});
        } else {
            this.setState({ showError: false});
            driverLicence.catagoryName = categoryName;
            this.props.createNewDriverLicence(driverLicence);
            this.handleClose();
        }
    };

    handleClose = () => {
        this.props.history.goBack();
    };

    handleSelectCategory = (categoryName) => {
        this.setState({
            categoryName: categoryName,
            showError: false
        })
    };


    getCategories = () => {
        return this.props.categories.map(category => {
             return <Form.Check inline label= {category} type="radio" onClick={() => this.handleSelectCategory(category)}/>

        })
    };

    render() {
        const {categoryErrorText, showError} = this.state;
        return (
            <Modal.Dialog>
                <Modal.Header closeButton={this.handleClose}>
                    <Modal.Title>Нова возачка дозвола </Modal.Title>
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
                                        <Form.Label>Категорија: </Form.Label>Form.Label>
                                        {this.getCategories()}
                                        <span className="text-danger" visible={showError} > {categoryErrorText} </span>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Дата: </Form.Label>
                                        <Field className="form-control" type="date"
                                               name="examinationDate"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewDriverLicence)