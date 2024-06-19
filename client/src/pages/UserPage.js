import React, { useEffect, useState } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import UserService from '../services/userService';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 페이지가 로드될 때 한 번만 유저 정보를 가져옴
    UserService.getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <div className="m-4">
      <h3>맴버 프로필</h3>
      </div>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
      <div className="user-list row content">
        {users.map((user) => (
          <UserProfileCard key={user.baekjoon_id} user={user} col={3} />
        ))}
      </div>
      </PerfectScrollbar>
    </div>
  );
}

export default UserPage;