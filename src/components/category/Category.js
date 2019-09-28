import React from 'react';

const Category = ({name, price}) => {
    return (
        <tr>
            <td>{name} </td>
            <td>{price}</td>
        </tr>
    )
};

export default Category;