import React from 'react';
import {Button} from 'react-bootstrap';
import {editCategory, removeCategory} from "../../actions/category";
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        editCategory: (category) => dispatch(editCategory(category))
    }
};

const Category = ({category, pathname, push, removeCategory}) => {
    const editCategoryPath = pathname + "/"+ category.id + "/edit";
    return (
        <tr>
            <td>{category.name} </td>
            <td>{category.price}</td>
            <td>
                <Button onClick={() => push(editCategoryPath)} className="btn btn-info"> Edit </Button>
            </td>
            <td>
                <Button onClick={() => removeCategory(category.id)} className="btn btn-danger"> Remove </Button>
            </td>
        </tr>
    )
};

export default connect(null, mapDispatchToProps)(Category)