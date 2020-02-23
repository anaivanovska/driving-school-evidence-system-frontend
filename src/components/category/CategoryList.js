import React from 'react';
import {connect} from 'react-redux';
import {fetchAllCategoriesPageable} from "../../actions/category";
import Category from "./Category";
import pageHOC from "../custom/pageHOC";
import Pagination from 'react-js-pagination';
import {DEFAULT_PAGE_SIZE, Roles, SERVER_URL} from "../../Constants";
import {Button} from 'react-bootstrap';
import {axiosAuthenticated} from "../../service/UserAuthentication";



class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            selectedCategory: null
        }
    }

    componentWillMount = () => {
        this.fetchCategories();
    };

    fetchCategories = () => {
        const role = this.props.match.params.role
        const {activePage} = this.state;
        this.props.getAllCategories(role, activePage - 1);
    };

    handlePageChange = (pageNumber) => {
        if (this.state.activePage != pageNumber) {
            this.setState(
                {
                    activePage: pageNumber
                },
                () => {
                    this.fetchCategories();
                }
            )
        }
    };


    handleOnClick = () => {
        const {history, location} = this.props;
        history.push(location.pathname + "/new");
    };

    handleRemove = (id) => {
        axiosAuthenticated().delete(`${SERVER_URL}/api/category/remove?id=${id}`)
            .then(response => {
                console.log("Remove cateogry: " + response.data);
                this.fetchCategories();
            })
            .catch(error =>{
                console.log("Remove category error ");
                throw(error)
            });
    }

    render() {
        const {activePage} =  this.state;
        const {categories} = this.props;
        const {totalElements, content} = categories;
        const {role} = this.props.match.params;

        return (
            <div className=" col-6 ml-10 mt-5">
                {(totalElements == undefined || totalElements == 0) &&
                <div>
                    <p>
                        Не се пронајдени категории.
                    </p>

                </div>}
                {totalElements > 0 &&
                <table className=" table table-striped table-bordered table-hovered" style={{border: 0}}>
                    <thead>
                    <tr>
                        <th scope="col">Име</th>
                        <th scope="col">Цена</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        content.map(category => {
                            return (
                                <Category key={category.name} category={category} push={this.props.history.push}
                                          pathname={this.props.location.pathname} removeCategory={(id) => this.handleRemove(id)}/>
                            );
                        })
                    }
                    </tbody>
                </table>}
                <div className="card-footer">
                    {(totalElements !== undefined && totalElements > 0) &&
                    <Pagination
                        innerClass="custom-pagination col-3"
                        activePage={activePage}
                        onChange={this.handlePageChange}
                        totalItemsCount={totalElements}
                        itemsCountPerPage={DEFAULT_PAGE_SIZE}
                    />}
                    {Roles.admin === role && <Button variant=" btn btn-secondary" onClick={this.handleOnClick}> Нова категорија </Button>}
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({categoryList}) => {
    return {
        categories: categoryList.pageable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: (role, page) => dispatch(fetchAllCategoriesPageable(role, page))
    }
};

const CategoryListScene = pageHOC(connect(mapStateToProps, mapDispatchToProps)(CategoryList))
export default CategoryListScene

