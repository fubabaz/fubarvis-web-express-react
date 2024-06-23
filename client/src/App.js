import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import AlgorithmPage from './pages/AlgorithmPage';
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
              <a href="/algorithm">주간알고리즘</a>
            </li>
          </ul>
        </nav>

        {/* 메인 콘텐츠 */}
        <main className="w-100">
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/algorithm" element={<AlgorithmPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
