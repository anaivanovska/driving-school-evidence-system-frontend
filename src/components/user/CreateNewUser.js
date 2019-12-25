import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';
import { connect } from 'react-redux';
import '../../style/index.scss'
import PersonalDataForm from "./PersonalDataForm"
import CheckboxContainer from "../custom/CheckboxContainer";
import {SERVER_URL} from "../../Constants";
import {axiosAuthenticated} from "../../service/UserAuthentication";

class CreateNewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            activeStep: 0
        };
    }

    handleClose = () => {
        this.props.history.goBack();
    };

    setUser = (user) => {
        this.setState({
            user
        });
    };

    saveCategories = (selectedCategories) => {
        const {match} = this.props;
        const {user} = this.state;
        axiosAuthenticated().post(`${SERVER_URL}/api/userCategory/${user.id}/${match.params.userType}/categories`, selectedCategories)
            .then(response => {
                this.handleClose()
            })
            .catch(error => {
                console.log("Селектираните опции неможе да се зачуваат")
            });
    };

    goToNextStep = () => {
       this.setState((prevState,prevProps) => {
          return {
              activeStep: prevState.activeStep + 1
          }
       })
    };
    render() {
        const {match, categories} = this.props;
        const {user, activeStep} = this.state;
        console.log("Active step: " + activeStep);
        return (
            <Accordion>
                    <AccordionItem title="1 Лични податоци" className="card-header" expanded={activeStep === 0}>
                        <PersonalDataForm userType={match.params.userType} goToNext = {this.goToNextStep} handleClose={this.handleClose} setUser={(user) => this.setUser(user)}/>
                    </AccordionItem>
                    <AccordionItem title="2 Категории" className="card-header" expanded={activeStep === 1}>
                        {user.id !== undefined &&  <CheckboxContainer options={categories} save={(selectedCategories) => this.saveCategories(selectedCategories)}/>}
                        {user.id === undefined && <div>Најпрво внесете ги податоците за корисникот, потоа катгориите</div>}
                    </AccordionItem>
            </Accordion>
        )
    }
}
const mapStateToProps = ({categoryList}) => {
    const categoryNames = categoryList.map(category => category.name);
    return {
        categories: categoryNames
    }
};

export default connect(mapStateToProps, null)(CreateNewUser);