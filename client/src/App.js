import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import PersonalAlgorithmPage from './pages/PersonalAlgorithmPage';
import AlgorithmPage from './pages/AlgorithmPage';

<h1>HeaderPage</h1>
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
            < li>
              <a href="/users">맴버프로필</a>
            </li>
          </ul>
          <div className="hr-container">
            <small className="text-start text-muted">활동</small>
            <hr className='my-1'/>
          </div>
          <ul>
            <li>
              <a href="/personal-algorithm">개인알고리즘</a>
            </li>
            <li>
              <a href="/algorithm">주간알고리즘</a>
            </li> 
            <li>
              <a href="#" disabled style={{ color: '#cfcfcf' }}>월간포스팅 </a>
            </li>
            <li>
              <a href="#" disabled style={{ color: '#cfcfcf' }}>프로필매치업</a>
            </li>
          </ul>

          <div class="hr-container">
            <small className="text-start text-muted">토이프로젝트</small>
            <hr className='my-1' />
          </div>
          <ul>
            <li>
              <a href="#" disabled style={{ color: '#cfcfcf' }}>fubarvis-web-express-react
              </a>
            </li>
            <li>
              <a href="#" disabled style={{ color: '#cfcfcf' }}>fubarvis-slack-bot
              </a>
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
