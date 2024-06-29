import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import PersonalAlgorithmPage from './pages/PersonalAlgorithmPage';
import AlgorithmPage from './pages/AlgorithmPage';

function App() {
  return (
    <Router>
      <div className="container">
        {/* 사이드바 */}
        <nav className="sidebar">
          <div className="logo-container">
            <img src="https://avatars.githubusercontent.com/u/28587109?s=200&v=4" alt="Logo" className="logo" />
          </div>

          <ul>
            <li>
              <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>맴버프로필</NavLink>
            </li>
          </ul>
          <div className="hr-container">
            <small className="text-start text-muted">활동</small>
            <hr className='my-1' />
          </div>
          <ul>
            <li>
              <NavLink to="/personal-algorithm" className={({ isActive }) => isActive ? "active" : ""}>개인알고리즘</NavLink>
            </li>
            <li>
              <NavLink to="/algorithm" className={({ isActive }) => isActive ? "active" : ""}>주간알고리즘</NavLink>
            </li>
            <li>
              <NavLink to="#" className="disabled" style={{ color: '#cfcfcf' }}>월간포스팅 </NavLink>
            </li>
            <li>
              <NavLink to="#" className="disabled" style={{ color: '#cfcfcf' }}>프로필매치업</NavLink>
            </li>
          </ul>

          <div className="hr-container">
            <small className="text-start text-muted">토이프로젝트</small>
            <hr className='my-1' />
          </div>
          <ul>
            <li>
              <NavLink to="#" className="disabled" style={{ color: '#cfcfcf' }}>fubarvis-web-express-react
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="disabled" style={{ color: '#cfcfcf' }}>fubarvis-slack-bot
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* 메인 콘텐츠 */}
        <main className="w-100">
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/personal-algorithm" element={<PersonalAlgorithmPage />} />
            <Route path="/algorithm" element={<AlgorithmPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
