import React from 'react';
import { connect} from 'react-redux';
import {fetchAllCategories} from "../../actions/category";
import Category from "./Category";
import {Card, Button} from 'react-bootstrap'

class CategoryList extends React.Component {
    componentWillMount() {
        this.props.getAllCategories();
    }

    handleOnClick = () => {
        const {push, location} = this.props;
        push(location.pathname + "/newCategory");
    };

    render() {
        const {categories} = this.props;
        return (
            <Card>
                <Card.Header>
                    Категории
                </Card.Header>
                {(categories == undefined || categories.length == 0) &&
                <Card.Body>
                    <p>
                        Не се пронајдени категории.
                    </p>
                    <p>
                        За да додадете нова категорија притиснете на копчето
                    </p>
                </Card.Body>
                }
                {categories.length > 0 &&
                <Card.Body>
                    <table className="table" style={{border: 0}}>
                        <thead>
                            <tr>
                                <th scope="col-2">Име</th>
                                <th scope="col-4">Цена</th>
                                <th scope="col-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map(category => {
                                    return (
                                        <Category key={category.name} {...category} />
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </Card.Body>
                }
                <Card.Footer>
                    <Button variant="secondary" onClick={this.handleOnClick}> Нова категорија </Button>
                </Card.Footer>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(fetchAllCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

