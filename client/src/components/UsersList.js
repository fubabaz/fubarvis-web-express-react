import React, { useState, useEffect } from 'react';
import users from '../data/users.json';

function UsersList() {
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.baekjoon_id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;