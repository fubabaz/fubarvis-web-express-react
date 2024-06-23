import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { fetchTrophyData } from "../../services/userService"; //
import throphyIcon from "../../assets/img/icon/trophy.png";

const TrophyModal = ({ show, handleClose, baekjoonId, image }) => {
  const [trophyData, setTrophyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrophy = async () => {
      setLoading(true);
      try {
        const data = await fetchTrophyData(baekjoonId);
        console.log(data);
        setTrophyData(data);
      } catch (error) {
        console.error("Error fetching trophy data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show && baekjoonId) {
      fetchTrophy();
    }
  }, [show, baekjoonId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img
            size="32"
            height="35"
            width="35"
            src={image}
            className="mx-2 rounded-circle user-avatar"
            alt="User Avatar"
          />{" "}
          획득한 트로피에요!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : trophyData ? (
          <>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">문제번호</th>
                  <th scope="col">문제제목</th>
                  <th scope="col">종류</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {trophyData.map((trophy, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        height="25"
                        width="25"
                        src={throphyIcon}
                        className="ml-3 user-avatar"
                        alt="Trophy Icon"
                      />
                    </td>
                    <td>{trophy.prob_no}</td>
                    <td>{trophy.prob_title}</td>
                    <td>{trophy.trophy_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TrophyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  githubId: PropTypes.string.isRequired,
};

export default TrophyModal;
