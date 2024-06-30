import 'react-perfect-scrollbar/dist/css/styles.css';
import UserProfileCard from '../components/UserProfileCard';
import UserService from '../services/userService';
import PerfectScrollbar from 'react-perfect-scrollbar'
import users from '../data/users.json';

function UserPage() {
  const handleCardClick = () => {
    UserService.getUsers().then((data) => {
    });

    UserService.fetchTrophyData().then((data) => {
    });
  };

  return (
    <div>
      
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3>맴버 프로필</h3>
        <button className="btn btn-primary" onClick={handleCardClick}>불러오기</button>
      </div>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
      <div className="user-list row content">
        {users.map((user) => (
          <UserProfileCard key={user.baekjoon_id} user={user} col={4} />
        ))}
      </div>
      </PerfectScrollbar>
    </div>
  );
}

export default UserPage;