import React, { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import TrophyModal from "./modal/TrophyModal";

import baekjoonLogo from "../assets/img/logo/baekjoon-logo.png";
import solvedLogo from "../assets/img/logo/solved-logo.png";
import tistoryLogo from "../assets/img/logo/tistory-logo.gif";
import throphyIcon from "../assets/img/icon/trophy.png";
const UserProfileCard = ({ user, col }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const cardClasses = ` bg-white rounded border-0 card p-2 my-3  ${col ? `col-${col}` : ""
    }`;
  return (
    <>
      <div className={cardClasses}>
        <div className="card-body shadow-sm">
          <div className="d-flex justify-content-start">
            <div>
              <img
                size="32"
                height="32"
                width="32"
                src={user.image}
                className="mx-2 mb-1 rounded-circle user-avatar"
                alt="User Avatar"
              />
            </div>

            <div className="d-flex align-items-center">
              <span style={{ fontWeight: "410" }}>{user.github_id}</span>
            </div>

            {user.trophy_cnt && (
              <div
                className="d-flex align-items-center mx-3"
                onClick={handleShowModal}
                style={{ cursor: "pointer" }}
              >
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

          <hr style={{ color: "#c4c4c4" }}></hr>
          <div className="mt-4 row text-center">
            <div className="col">
              <p className="card-text mb-1" style={{ fontSize: "13px" }}>
                <img
                  src={baekjoonLogo}
                  style={{
                    width: "20px",
                    borderRadius: "3px",
                  }}
                />
              </p>
              <p>
                <small>
                <b className="text-muted">
                  {user.ranking.toLocaleString()}
                </b>
                </small>
              </p>
            </div>
            <div className="col">
              <p className="card-text mb-1" style={{ fontSize: "13px" }}>
                <img
                  src={solvedLogo}
                  style={{
                    width: "20px",
                    borderRadius: "3px",
                  }}
                />
              </p>
              <p>
                <small>
                  <b className="text-muted">
                  {user.lev} {user.ac_rating.toLocaleString()}
                </b>
                </small>
              </p>
            </div>
            <div className="col">
              <p className="card-text mb-1" style={{ fontSize: "13px" }}>
                <img
                  src={tistoryLogo}
                  style={{
                    width: "20px",
                    borderRadius: "3px",
                  }}
                />
              </p>
              <p>
              <small>
                <b className="text-muted">{user.posting_cnt}</b>
                </small>
              </p>

            </div>
          </div>

          <p className="card-text mb-1" style={{ fontSize: "13px" }}>
            <small className="text-muted">{user.joinedDate}</small>
          </p>



          <hr style={{ color: "#c4c4c4" }}></hr>

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
          <div className="image-container">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${user.github_id}&count_private=true&theme=graywhite&show_icons=true`}
              alt="GitHub Stats"
              className="cropped-image"
            />

            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.github_id}&count_private=true&layout=compact&theme=graywhite&hide_title=true`}
              alt="Top Languages"
              className="cropped-image"
            />
          </div>
        </div>
      </div>

      <TrophyModal
        show={showModal}
        handleClose={handleCloseModal}
        trophyCount={user.trophy_cnt}
        baekjoonId={user.baekjoon_id}
        image={user.image}

      />
    </>
  );
};

export default UserProfileCard;
