import React from 'react';
import {Form, FormGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {createNewCategory, editCategory} from "../../actions/category"
import pageHOC from "../custom/pageHOC";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Името на категоријата е задолжително'),
    price: Yup.number('Цената мора да е составена само од цифри').required('Цената за категоријата е задолжителна')
});

const mapDispatchToProps = (dispatch) => {
    return {
        createNewCategory: (category) => dispatch(createNewCategory(category)),
        editCategory: (category) => dispatch(editCategory(category))
    }
};

const mapStateToProps = ({categoryList}) => {
    return {
        categories: categoryList.pageable
    }
};

const CreateNewCategory = (props) => {

    const getInitialValues = () => {
        const category = getSelectedCategory();
        return {
            name: category !== null ? category.name : '',
            price: category !== null ? category.price : 0
        }

    };

    const getSelectedCategory = () => {
        const categoryId = getCategoryId();
        if (categoryId) {
            const {categories} = props;
            for (let category of categories.content) {
                if (category.id == categoryId) {
                    return category;
                }
            }
        } else {
            return null;
        }
    };

    const getCategoryId = () => {
        return props.match.params.id;
    };


    const handleSubmit = (values) => {
        const categoryId = getCategoryId();
        if (categoryId) {
            const category = {...values};
            category.id = categoryId;
            props.editCategory(category)
        } else {
            props.createNewCategory(values);
        }
        props.history.goBack();
    };

    return (
                <div className="col-6 ml-10 mt-5">
                    <h2>Креирај нова категорија</h2>
                    <div>
                        <Formik
                            initialValues={getInitialValues()}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            render={(formProps) => {
                                return (
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
                                            </div>
                                        </FormGroup>
                                    </Form>);
                            }
                            }
                        />
                    </div>
                </div>
    )
}

const CreateNewCategoryScene = pageHOC(connect(mapStateToProps, mapDispatchToProps)(CreateNewCategory));
export default CreateNewCategoryScene;