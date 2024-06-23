import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
<h1>HeaderPage</h1>
function App() {
  return (
    <Router>
      <div className="container">
        {/* 사이드바 */}
        <nav className="sidebar">
          <div className="logo-container">
              <img src="https://avatars.githubusercontent.com/u/28587109?s=200&v=4" alt="Logo" className="logo"/>
          </div>
          <ul>
          < li>
              <a href="/users">맴버프로필</a>
            </li>
            <li>
              <a href="/users">개인알고리즘</a>
            </li>
          </ul>
        </nav>

        {/* 메인 콘텐츠 */}
        <main >
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/users" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
