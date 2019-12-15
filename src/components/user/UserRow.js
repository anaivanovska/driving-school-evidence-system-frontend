import React from 'react';

const UserRow = ({user, handleOnClick}) => {
    return (
      <tr onClick={() => {
          handleOnClick(user)
      }}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
      </tr>
    );
};

export default UserRow;