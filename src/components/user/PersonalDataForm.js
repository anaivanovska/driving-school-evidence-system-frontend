import React from 'react';
import {Form, FormGroup, Button} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Roles, SERVER_URL} from "../../Constants";
import {axiosAuthenticated} from "../../service/UserAuthentication";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Името е задолжително'),
    lastName: Yup.string().required('Презимето е задолжително'),
    email: Yup.string().required('Емаил е задолжително поле'),
    embg: Yup.string().required('Матичен број е задолжително поле')
});

const PersonalDataForm = ({user, userType, goBack, goToProfile}) => {

    const initialValues = {
        firstName: user.firstName || '',
        lastName: user.lastName ||  '',
        parentName: user.parentName || '',
        embg: user.embg || '',
        identityCardNumber: user.identityCardNumber || '',
        profession: user.profession || '',
        birthDate:user.birthDate || new Date(),
        birthPlace: user.birthPlace || '',
        address: user.address || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        gender: user.gender || ''
    };


    const handleSubmit = (values) => {
        let url = SERVER_URL;
        const id = user.id;
        if (id !== undefined) {
            url += "/api/user/edit";
            values.id = id;
        } else {
            url += "/api/user/new/" + userType;
        }

        axiosAuthenticated().post(`${url}`, values)
            .then(response => {
                console.log(response);
                if (response.status === 202) {
                    alert("Корисникот со емаил " + values.email  + " веќе постои. Но додадена му е улогата " + userType === Roles.instructor ? "инструктор" : "кандидат");
                    goToProfile(response.data.id)
                } else if(response.status === 400) {
                    alert("Корисникот со емаил " + values.email + " веќе постои. Доколу сакате да промените некои од инфорамациите за овој корисник направеде едитирање.")
                    goBack();
                } else {
                    goToProfile(response.data.id);
                }

            })
            .catch(error => {
                alert(`Настана грешка при креирањето на корисникот. Обидете се повторно `);
                goBack();
            });

    };

    return (
        <Formik
                initialValues = {initialValues}
                onSubmit={handleSubmit}
                validationSchema ={validationSchema}
                render={(formProps) => {
                    return(
                        <Form onSubmit={formProps.handleSubmit}>
                            <FormGroup>
                                <Form.Label>Е-маил: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="email"
                                       placeholder="example@mail.com"/>

                                <ErrorMessage className="text-danger" name="email" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Име: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="firstName"
                                       placeholder="Име"/>

                                <ErrorMessage className="text-danger" name="firstName" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Презиме: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="lastName"
                                       placeholder="Презиме"/>

                                <ErrorMessage className="text-danger" name="lastName" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Име на родител: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="parentName"
                                       placeholder="Име на родител"/>

                                <ErrorMessage className="text-danger" name="parentName" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Единичен матичен број: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="embg"
                                       placeholder="ЕМБГ"/>

                                <ErrorMessage className="text-danger" name="embg" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Број на лична карта: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="identityCardNumber"
                                       placeholder="А12345"/>

                                <ErrorMessage className="text-danger" name="identityCardNumber" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Професија: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="profession"
                                       placeholder="Инструктор"/>

                                <ErrorMessage className="text-danger" name="profession" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Дата на раѓање: </Form.Label>
                                <Field type="date"
                                    className="form-control"
                                    name="birthDate"/>

                                <ErrorMessage className="text-danger" name="birthDate" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Место на раѓање: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="birthPlace"
                                       placeholder="Место на раѓање"/>

                                <ErrorMessage className="text-danger" name="birthPlace" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Адреса на живеење: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="address"
                                       placeholder="Aдреса"/>

                                <ErrorMessage className="text-danger" name="address" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Телефонски број: </Form.Label>
                                <Field className="form-control" type="text"
                                       name="phoneNumber"
                                       placeholder="07*/***-***"/>

                                <ErrorMessage className="text-danger" name="phoneNumber" component="div"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Пол: </Form.Label>
                                <Field className="form-control" component="select"
                                       name="gender">
                                    <option value="MALE">Машки</option>
                                    <option value="FEMALE">Женски</option>
                                </Field>
                                <ErrorMessage className="text-danger" name="gender" component="div"/>
                            </FormGroup>
                            <hr/>
                            <FormGroup>
                                <div className="p-3 row justify-content-end">
                                    <Button variant="primary" type="submit">Зачувај</Button>
                                    <Button variant="danger"  onClick={goBack}>Назад</Button>
                                </div>
                            </FormGroup>
                        </Form>)}}/>
        );
}

export default PersonalDataForm;