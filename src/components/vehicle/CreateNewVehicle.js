import React from 'react';
import {Form, FormGroup, Button} from 'react-bootstrap';
import {Formik, Field, ErrorMessage} from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import {Roles, SERVER_URL} from "../../Constants";
import { connect } from 'react-redux';
import {fetchUsersWithRoleGroupedByCategory} from "../../actions/user";


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

class CreateNewVehicle extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedCategory: "",
            selectedUser: null
        }
    }

    componentWillMount() {
        this.props.groupUsersWithRoleByCategory(Roles.instructor);
    }

    render() {
        console.log("render");
        console.log(this.props.usersByCategory);
        return (<div> Vehicles </div>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        groupUsersWithRoleByCategory: (role) => dispatch(fetchUsersWithRoleGroupedByCategory(role))
    }
};

const mapStateToProps = ({userList}) => {

    return {
        usersByCategory: userList.usersByCategory
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewVehicle);
