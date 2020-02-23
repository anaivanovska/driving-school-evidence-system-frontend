import React from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';
import {createNewDriverLicence} from "../../actions/driverLicence";
import {fetchAllCategories} from "../../actions/category";
import RadioButtonsContainer from "../custom/RadioButtonsContainer";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        createNewDriverLicence: (driverLicence, userId) => dispatch(createNewDriverLicence(driverLicence, userId)),
        fetchAllCategories: () => dispatch(fetchAllCategories())
    }
};

const mapStateToProps = ({categoryList}) => {
    const categoryNames = categoryList.list.map(category => category.name);
    return {
        categories: categoryNames
    }
};

class CreateNewDriverLicence extends React.Component {

    constructor(props) {
        super(props);
        const {driverLicence} = props;
        this.state = {
            selectedCategory: driverLicence.hasOwnProperty('categoryName') ? driverLicence.categoryName : '',
            categoryErrorText: 'Изборот на категоријата е задолжителен',
            showError: false,
            examinationDate: driverLicence.hasOwnProperty('examinationDate') ? driverLicence.examinationDate : new Date()
        };
    }

    componentWillMount = () => {
        this.props.fetchAllCategories();
    };

    handleSubmit = () => {
        const {selectedCategory, examinationDate} = this.state;
        const {driverLicence} = this.props;
        const driverLicenceTmp = {
            categoryName: selectedCategory,
            examinationDate: examinationDate
        };

        if (driverLicence.hasOwnProperty('id')) {
            driverLicenceTmp.id = driverLicence.id;
        }

        if (selectedCategory === '') {
            this.setState({showError: true});
        } else {
            this.setState({showError: false});
            const {userId} = this.props;
            this.props.createNewDriverLicence(driverLicenceTmp, userId);
            this.props.toggleModal();
        }
    };


    setCategoryName = (categoryName) => {
        this.setState({
            selectedCategory: categoryName,
            showError: false
        });
    };


    setExaminationDate = (date) => {
        this.setState({
            examinationDate: date
        });
    };


    render() {
        const {categoryErrorText, showError, selectedCategory, examinationDate} = this.state;
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Нова возачка дозвола </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Form.Label>Изберете категорија и возило: </Form.Label>
                            <RadioButtonsContainer options={this.props.categories}
                                                   setSelected={(selected) => this.setCategoryName(selected)}
                                                   selected={selectedCategory}
                                                   name="categoryName"/>
                            <span className="text-danger" visible={showError}> {categoryErrorText} </span>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Датум на издавање: </Form.Label>
                            <Form.Control className="form-control"
                                          type="date"
                                          name="examinationDate"
                                          value={examinationDate}
                                          onChange={(event) => this.setExaminationDate(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div className="p-3 row justify-content-end">
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Зачувај</Button>
                                <Button variant="danger" onClick={this.props.toggleModal}>Затвори</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewDriverLicence);