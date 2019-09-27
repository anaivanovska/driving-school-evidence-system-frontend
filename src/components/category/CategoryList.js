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
        this.props.push("/profile/newCategory");
    };
    render() {
        const {categories} = this.props;
        if(categories.length == 0 || categories == undefined) {
            return (
                <Card>
                    <Card.Header>
                        Категории
                    </Card.Header>
                    <Card.Body>
                        <p>
                            Не се пронајдени категории.
                        </p>
                        <p>
                            За да додадете нова категорија притиснете на копчето
                            <br/>
                            <Button variant="secondary" onClick={this.handleOnClick}> Нова категорија </Button>
                        </p>
                    </Card.Body>
                    <Card.Footer/>
                </Card>
            )
        } else {
            return (
                <div>
                    {
                        categories.map(category => {
                            return (
                                <Category key={category.name} {...category} />
                            );
                        })
                    }
                </div>
            );
        }

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

