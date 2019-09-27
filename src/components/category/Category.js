import React from 'react';

const Category = ({name, price}) => {
    console.log(name);
    return (
        <div>
            <div>{name}</div>
            <div>{price}</div>
        </div>
    )
};

export default Category;