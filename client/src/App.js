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
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/users">Users</a>
            </li>
          </ul>
        </nav>

        {/* 메인 콘텐츠 */}
        <main >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
