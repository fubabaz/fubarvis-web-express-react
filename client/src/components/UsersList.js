import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

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