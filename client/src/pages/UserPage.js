import 'react-perfect-scrollbar/dist/css/styles.css';
import UserProfileCard from '../components/UserProfileCard';
import UserService from '../services/userService';
import PerfectScrollbar from 'react-perfect-scrollbar'
import users from '../data/users.json';

function UserPage() {
  const handleCardClick = () => {
    UserService.getUsers().then((data) => {
    });
  };

  return (
    <div>
      <div className="m-4">
      <h3>맴버 프로필</h3>
      <button onClick={() => handleCardClick()}>click</button>
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