import React from 'react';

const Vehicle = ({brand, type, registrationNumber, registrationDate}) => {
    return (
        <tr>
            <td>{brand} </td>
            <td>{type}</td>
            <td>{registrationNumber} </td>
            <td>{registrationDate}</td>
        </tr>
    )
};

export default Vehicle;