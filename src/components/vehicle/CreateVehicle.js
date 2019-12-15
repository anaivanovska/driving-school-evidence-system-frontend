import React from 'react';
import {Form, FormGroup, Button} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import {Roles, SERVER_URL} from "../../Constants";
import {axiosAuthenticated} from "../../service/UserAuthentication";


const initialValues = {
    type: '',
    brand: '',
    registrationNumber: '',
    registrationDate: new Date()
};

const validationSchema = Yup.object().shape({
    type: Yup.string().required('Типот на возилото е задолжително поле'),
    brand: Yup.string().required('Марката на возилото е задолжително поле'),
    registrationNumber: Yup.string().required('Бројот на регистрација е задолжително поле'),
    registrationDate: Yup.string().required('Датата на регистрација е задолжително поле')
});

class CreateVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: ""
        }
    }
    return (

    )
};

