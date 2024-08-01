import React, { useState, useEffect } from "react";
import RepoCard from "react-repo-card";

const NotionPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = (data, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3 className="d-flex align-items-center">토이프로젝트</h3>
      </div>
      <div className="row content">
        <div style={{ height: "calc(100vh - 150px)" }}>
          <div
            className="card mb-3 me-3 rounded border-0 card"
            style={{
              cursor: "pointer",
            }}
          >
            <RepoCard username="fubabaz" repository="algorithm" />
          </div>

          <div
            className="card mb-3 me-3 rounded border-0 card"
            style={{
              cursor: "pointer",
            }}
          >
            <RepoCard username="fubabaz" repository="fubarvis-web-express-react" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionPage;
