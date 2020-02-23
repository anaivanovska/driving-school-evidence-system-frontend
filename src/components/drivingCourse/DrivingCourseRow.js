import React from 'react';
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
import {Roles} from "../../Constants";

const DrivingCourseRow = ({role, drivingCourse, handleOnClick, handleRemove, handleEdit}) => {
    console.log("Role");
    console.log(role);
    return (
        <tr>
            <td>{drivingCourse.ordinalNumber}</td>
            <td>{drivingCourse.vehicle.categoryName}</td>
            <td>{drivingCourse.vehicle.brand} {drivingCourse.vehicle.type}</td>
            <td>{drivingCourse.lecturer.firstName} {drivingCourse.lecturer.lastName}</td>
            <td>
                <Button onClick={() => handleOnClick(drivingCourse)} className="btn btn-info"> Прикажи </Button>
            </td>
            {role === Roles.admin &&
            <td>
                <Button onClick={() => handleEdit(drivingCourse)} className="btn btn-warning text-white">
                    <FontAwesomeIcon icon={faPen}/>
                    Едитирај </Button>
            </td>
            }
            {role === Roles.admin &&
            <td>
                <Button onClick={() => handleRemove(drivingCourse.id)} className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash}/>
                    Избриши
                </Button>
            </td>}
        </tr>
    );
};

export default DrivingCourseRow;