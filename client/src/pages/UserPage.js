import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import UserProfileCard from '../components/UserProfileCard';
import UserService from '../services/userService';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import users from '../data/users.json';

function UserPage() {
  const handleCardClick = async () => {
    // 비동기 작업을 병렬로 실행하고 각각의 성공/실패 처리
    await  Promise.all([
      UserService.getUsers(),
      UserService.fetchTrophyData()
    ])
    .then(([usersData, trophyData]) => {
      toast.success('오옷..! 최신 데이터로 가져왔어요! 😀');
      // 필요시 가져온 데이터 처리
    })
    .catch((error) => {
      toast.error('이런.. 데이터를 불러오는 중 오류가...');
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div>
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3>맴버 프로필</h3>
        <button className="btn btn-sm btn-primary" onClick={handleCardClick}>데이터 갱신</button>
      </div>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <div className="user-list row content">
          {users.map((user) => (
            <UserProfileCard key={user.baekjoon_id} user={user} col={4} />
          ))}
        </div>
      </PerfectScrollbar>
      <ToastContainer style={{fontSize:'14px'}}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default UserPage;
