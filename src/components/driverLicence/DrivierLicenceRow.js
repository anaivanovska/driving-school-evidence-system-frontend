import React from 'react';
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
import {Roles} from "../../Constants";

const DriverLicenceRow = ({role, driverLicence, handleRemove, handleEdit}) => {
    return (
        <tr>
            <td>{driverLicence.categoryName}</td>
            <td>{driverLicence.examinationDate}</td>

            {role === Roles.admin &&
            <td>
                <Button onClick={() => handleEdit(driverLicence)} className="btn btn-warning text-white">
                    <FontAwesomeIcon icon={faPen}/>
                    Едитирај </Button>
            </td>
            }
            {role === Roles.admin &&
            <td>
                <Button onClick={() => handleRemove(driverLicence.id)} className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash}/>
                    Избриши
                </Button>
            </td>}
        </tr>
    );
};

export default DriverLicenceRow;