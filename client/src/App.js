import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
import MemberProfilePage from "./pages/MemberProfilePage";
import FreeAlgorithmPage from "./pages/FreeAlgorithmPage";
import WeeklyAlgorithmPage from "./pages/WeeklyAlgorithmPage";
import MonthlyPostingPage from "./pages/MonthlyPostingPage";
import githubLogo from "./assets/img/logo/github-logo.png";
import GuidePayback from "./pages/GuidePayback";
import ToyProjectPage from './pages/ToyProjectPage';

const App = () => {
  const sidebarLinks = [
    { to: "/member-profile", label: "멤버프로필" },
    { to: "/guide-payback", label: "페이백안내" },
  ];

  const activityLinks = [
    { to: "/algorithm-free", label: "자유알고리즘" },
    { to: "/algorithm-weekly", label: "주간알고리즘" },
    { to: "/posting-monthly", label: "월간포스팅" },
    { to: "#", label: "프로필매치업", disabled: true },
    { to: "/toy-project", label: "토이프로젝트" },
  ];

  const projectLinks = [
    {
      href: "https://github.com/fubabaz/fubarvis-web-express-react",
      label: "fubarvis-web-express-react",
      external: true,
    },
    { to: "#", label: "fubarvis-slack-bot", disabled: true },
  ];

  const linkStyle = (isActive) => (isActive ? "active" : "");
  const disabledLinkStyle = { color: "#cfcfcf" };

  return (
    <Router>
      <div className="container">
        <nav className="sidebar">
          <div className="logo-container">
            <img
              src="https://avatars.githubusercontent.com/u/28587109?s=200&v=4"
              alt="Logo"
              className="logo"
            />
          </div>

          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => linkStyle(isActive)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hr-container">
            <small className="text-start text-muted">활동</small>
            <hr className="my-1" />
          </div>

          <ul>
            {activityLinks.map((link) => (
              <li key={link.to}>
                {link.disabled ? (
                  <NavLink to={link.to} className="disabled" style={disabledLinkStyle}>
                    {link.label}
                  </NavLink>
                ) : (
                  <NavLink to={link.to} className={({ isActive }) => linkStyle(isActive)}>
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

        </nav>

        <main className="w-100">
          <Routes>
            <Route path="/" element={<MemberProfilePage />} />
            <Route path="/member-profile" element={<MemberProfilePage />} />
            <Route path="/guide-payback" element={<GuidePayback />} />
            <Route path="/algorithm-free" element={<FreeAlgorithmPage />} />
            <Route path="/algorithm-weekly" element={<WeeklyAlgorithmPage />} />
            <Route path="/posting-monthly" element={<MonthlyPostingPage />} />
            <Route path="/toy-project" element={<ToyProjectPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;