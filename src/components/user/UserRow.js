import React from 'react';
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faTrash} from '@fortawesome/free-solid-svg-icons'

const UserRow = ({user, handleOnClick, handleRemove}) => {
    return (
      <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.embg}</td>
          <td>{user.birthDate}</td>
          <td>{user.birthPlace}</td>
          <td>{user.address} </td>
          <td>{user.phoneNumber}</td>
          <td>
              <Button onClick={() => handleOnClick(user)} className="btn btn-light"> Прикажи </Button>
          </td>
          <td>
              <Button onClick={() => handleRemove(user.id)} className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash}/>
              </Button>
          </td>
      </tr>
    );
};

export default UserRow;