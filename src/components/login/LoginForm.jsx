import  React, {Component} from 'react';
import { FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import {Button, InputGroup, InputGroupAddon} from 'reactstrap';
import {saveToken} from "../../service/UserAuthentication";
import {SERVER_URL} from "../../Constants";
import {fetchUserByUsername} from "../../actions/index";

const LoginTemplate = ({
                           values,
                           errors,
                           touched,
                           handleSubmit,
                           handleChange,
                           isSubmitting
                       }) => (
    <Form>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" value={values.username} onChange={handleChange}><i className="fa fa-user" /> </InputGroupAddon>
                <Field type="text" name="username" placeholder="Username" />
                {touched.username && errors.username && <p className="text-danger">{errors.username}</p>}
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend" value={values.password} onChange={handleChange}><i className="fa fa-key" /> </InputGroupAddon>
                <Field type="password" name="password" placeholder="password"/>
                {touched.password && errors.password && <p className="text-danger">{errors.password}</p>}
            </InputGroup>
        </FormGroup>
        <Button type="submit" disabled={isSubmitting} className="btn btn-outline-light">Log in</Button>
    </Form>
);

const LoginForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().email().required('Username is required'),
        password: Yup.string().min(4).required('Password is required')
    }),
    handleSubmit(values,{props, resetForm, setSubmitting}) {
        const {history} = props;
        setSubmitting(true);
        axios.post(`${SERVER_URL}/login`,
            {
                username: values.username,
                password: values.password
            })
            .then(response => {
                console.log(response);
                setSubmitting(false);
                saveToken(response);
                const {username } = values;
                console.log(props);
                history.push("/profile", username);
                resetForm();
            })
            .catch(error => {
                setSubmitting(false);
                resetForm();
                alert('Invalid username or password. Please try again');
            });
    }
})(LoginTemplate);

export default LoginForm;