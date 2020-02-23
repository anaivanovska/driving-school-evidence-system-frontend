import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {QUALIFICATION_TYPES, SERVER_URL} from "../../Constants";
import RadioButtonsContainer from "../custom/RadioButtonsContainer";
import Modal from "react-bootstrap/es/Modal";
import {axiosAuthenticated} from "../../service/UserAuthentication";
import CheckboxContainer from "../custom/CheckboxContainer";
import {fetchAllCategories} from "../../actions/category";

class CategoriesForInstructor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enableSelectCategories: false,
            type: "",
            categories: [],
            errorMessage: ""
        }
    }

    getSelectedCategoriesForInstructor = (id) => {

        axiosAuthenticated().get(`${SERVER_URL}/api/instructorCategory/allCategories/${id}`)
            .then(response => {
                const data = response.data;
                const type = Object.keys(data).pop();
                let categories = data[type];

                if (categories === undefined || categories.size == 0) {
                    categories = [];
                }

                this.setState({
                    type,
                    categories
                });
            })
            .catch(error => {
                throw(error)
            })
    };

    componentWillMount() {
        const {id, getAllCategories} = this.props;
        this.getSelectedCategoriesForInstructor(id);
        getAllCategories();
    }

    toggleSelectCategoriesDiaglog = (value) => {
        this.setState({enableSelectCategories: value})
    };

    setType = (type) => {
        this.setState({type});
    };

    setCategories = (categories) => {
        this.setState({categories});
    };


    save = () => {
        const {type, categories} = this.state;

        console.log("Type: " + type);
        console.log("Caegories: " + categories);

        if (type === "") {
            this.setState({errorMessage: "Селектирајте го типот на инструкторот"})
        } else if (categories === undefined || categories.size == 0) {
            this.setState({errorMessage: "Селектирајте барем една категорија"})
        } else {
            this.setState({errorMessage: ""});
            axiosAuthenticated().post(`${SERVER_URL}/api/instructorCategory/${this.props.id}/${type}/categories`, categories)
                .then(response => {
                    this.setState({enableSelectCategories: false});
                })
                .catch(error => {
                    console.log("Селектираните опции неможе да се зачуваат")
                });

        }
    }

    showCategories = () => {
        const {type, categories} = this.state;
        console.log("Type: " + type);
        console.log(categories);
        if (type == undefined || type !== "") {
            let allCategories = "";
            categories.forEach(category => {
                allCategories += category +","
            });
            allCategories = allCategories.substr(0, allCategories.length - 1);

            return (
                <div>
                    <div>Тип на инструктор: {type}</div>
                    <div>Категории: {allCategories}</div>
                </div>
            );
        } else {
            return (
                <div> Инструкторот не поседува категории за кои може да извршува обука </div>
            );
        }
    };

    render() {
        const {enableSelectCategories, type, categories, errorMessage} = this.state;
        const {allCategories} = this.props;
        return (
            <div>
                {this.showCategories()}
                <Button variant="secondary" onClick={() => this.toggleSelectCategoriesDiaglog(true)}> Избери тип и </Button>
                <Modal show={enableSelectCategories} onHide={() => this.toggleSelectCategoriesDiaglog(false)}
                       animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title> Категории на инструкторот</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div> Тип на обука:</div>
                        <RadioButtonsContainer options={QUALIFICATION_TYPES}
                                               setSelected={(selectedType) => this.setType(selectedType)}
                                               selected={type}/>
                        <div> Категории:</div>
                        <CheckboxContainer options={allCategories}
                                           save={(selectedCategories) => this.setCategories(selectedCategories)}
                                           selected={categories}/>
                        <div className="text-danger">{errorMessage} </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={() => this.save()}>Зачувај</Button>
                        <Button className="btn btn-danger" onClick={() => this.toggleSelectCategoriesDiaglog(false)}>Затвори</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }

};

const mapStateToProps = ({categoryList}) => {
    const categoryNames = categoryList.list.map(category => category.name);
    return {
        allCategories: categoryNames
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(fetchAllCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForInstructor);