import  React, {Component} from 'react';
import { FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';
import {Button, InputGroup, InputGroupAddon} from 'reactstrap';
import {saveToken} from "../../service/UserAuthentication";
import {SERVER_URL} from "../../Constants";
import {fetchUserByUsername} from "../../actions/index";
import { connect } from 'react-redux';


import { Formik, Form, Field, ErrorMessage } from 'formik';

const mapDispatchToProps = dispatch => {
    return {
        fetchUserByUsername: (username) => {
            dispatch(fetchUserByUsername(username))
        }
    }
};

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    username: Yup.string().email().required('Username is required'),
    password: Yup.string().min(4).required('Password is required')
});

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    componentWillUnmount() {
        console.log("component will unmount");
    }
    handleSubmit = (values, { setSubmitting, resetForm}) => {
        const {push, fetchUserByUsername} = this.props;
        setSubmitting(true);
        axios.post(`${SERVER_URL}/login`,
            {
                username: values.username,
                password: values.password
            })
            .then(response => {
                setSubmitting(false);
                saveToken(response);
                const {username } = values;
                push("/profile", {username});
                //fetchUserByUsername(username);
                resetForm();
            })
            .catch(error => {
                setSubmitting(false);
                resetForm();
                alert('Invalid username or password. Please try again');
            });
    };

    render() {
        return(
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
                render={(formProps) => {
                    return(
                    <Form onSubmit={formProps.handleSubmit}>
                        <div>
                            <Field
                                type="email"
                                name="username"
                                placeholder="Email Address"
                            />
                            <ErrorMessage name="username" component="div"/>
                        </div>
                       <div>
                           <Field
                               type="password"
                               name="password"
                               placeholder="Password"
                           />
                           <ErrorMessage name="password" component="div"/>
                       </div>
                        <button type="submit" disabled={formProps.isSubmitting}> Submit Form </button>
                    </Form>);
                    }
                }
            />
        );
    }
}

export default LoginForm;
