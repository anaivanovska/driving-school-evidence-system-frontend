import  React from 'react';
import {Form, FormGroup, Button} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import {getAuthority, saveAuthorities, saveToken} from "../../service/UserAuthentication";
import {SERVER_URL} from "../../Constants";
import {fetchUserByUsername} from "../../actions/user";
import { connect } from 'react-redux';
import '../../index.css'


import { Formik, Field, ErrorMessage } from 'formik';

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

    handleSubmit = (values, { setSubmitting, resetForm}) => {
        const {push, fetchUserByUsername} = this.props;
        setSubmitting(true);
        console.log("Handle submit");
        axios.post(`${SERVER_URL}/login`,
            {
                username: values.username,
                password: values.password
            })
            .then(response => {
                setSubmitting(false);
                saveToken(response);
                saveAuthorities(response);
                const {username } = values;
                console.log("Authority:" + getAuthority());
                fetchUserByUsername(username);
                push("/profile/"+getAuthority());
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
c                render={(formProps) => {
                    return(
                    <Form onSubmit={formProps.handleSubmit}>
                        <FormGroup>
                            <Form.Label>Username</Form.Label>
                            <Field className="form-control"  type="email"
                                           name="username"
                                           placeholder="Username"/>

                            <ErrorMessage className="text-danger" name="username" component="div"/>
                        </FormGroup>
                       <FormGroup>
                           <Form.Label>Password</Form.Label>
                           <Field className="form-control" type="password"
                                          name="password"
                                          placeholder="Password"/>
                           <ErrorMessage className="text-danger" name="password" component="div"/>
                       </FormGroup>
                        <Button variant="primary" type="submit" disabled={formProps.isSubmitting}> Submit Form </Button>
                    </Form>);
                    }
                }
            />
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(LoginForm);
