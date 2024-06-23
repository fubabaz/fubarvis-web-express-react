import React from "react";
import PropTypes from "prop-types";
import GitHubCalendar from "react-github-calendar";
import baekjoonLogo from "../assets/img/logo/baekjoon-logo.png";
import solvedLogo from "../assets/img/logo/solved-logo.png";
import tistoryLogo from "../assets/img/logo/tistory-logo.gif";
import throphyIcon from "../assets/img/icon/trophy.png";
const UserProfileCard = ({ user, col }) => {
  const cardClasses = ` bg-white rounded border-0 card p-2 my-3  ${
    col ? `col-${col}` : ""
  }`;
  return (
    <div className={cardClasses}>
      <div className="d-flex justify-content-start">
        <div>
          <img
            size="32"
            height="32"
            width="32"
            src={user.image}
            className="mx-3 rounded-circle user-avatar"
            alt="User Avatar"
          />
        </div>

        <div className="d-flex align-items-center">
          <span style={{ fontWeight: "410" }}>{user.github_id}</span>
        </div>
       
        {user.trophy_cnt && (
            <div className="d-flex align-items-center mx-3">
          <img
            height="25"
            width="25"
            src={throphyIcon}
            className="ml-3 rounded-circle user-avatar"
            alt="Trophy Icon"
          />
          <span className="ml-0 text-primary" style={{ fontWeight: "410" }}>
              {user.trophy_cnt}
            </span>
            </div>
        )}
      </div>
      <div className="card-body shadow-sm">
        <GitHubCalendar
          hideMonthLabels={true}
          hideTotalCount={false}
          hideColorLegend={true}
          blockSize={3}
          blockMargin={2}
          blockRadius={1}
          fontSize={10}
          username={user.github_id}
        />
        <p className="card-text mb-1" style={{ fontSize: "13px" }}>
          <small className="text-muted">{user.joinedDate}</small>
        </p>
        <p className="card-text mb-1" style={{ fontSize: "13px" }}>
          <img
            src={baekjoonLogo}
            style={{
              width: "20px",
              borderRadius: "3px",
              marginRight: "10px",
            }}
          />
          <small className="text-muted">{user.ranking.toLocaleString()}</small>
        </p>
        <p className="card-text mb-1" style={{ fontSize: "13px" }}>
          <img
            src={solvedLogo}
            style={{
              width: "20px",
              borderRadius: "3px",
              marginRight: "10px",
            }}
          />
          <small className="text-muted">
            {user.lev} {user.ac_rating.toLocaleString()}
          </small>
        </p>
        <p className="card-text mb-1" style={{ fontSize: "13px" }}>
          <img
            src={tistoryLogo}
            style={{
              width: "20px",
              borderRadius: "3px",
              marginRight: "10px",
            }}
          />
          <small className="text-muted">{user.posting_cnt}건</small>
        </p>
      </div>
    </div>
  );
};
/*
UserProfileCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    joinedDate: PropTypes.string.isRequired,
  }).isRequired,
};
*/

export default UserProfileCard;
