import React, { useEffect, useState } from "react";
import AlgorithmService from "../services/algorithmService";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import baekjoonLogo from "../assets/img/logo/baekjoon-logo.png";

import problemss from "../data/problems-group.json";

function PersonalAlgorithmPage() {
  const [individual, setIndividual] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [filterData, setFilterData] = useState(problemss);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.flourish.studio/resources/embed.js";
    script.async = true;
    document.body.appendChild(script);

    AlgorithmService.individual().then((data) => {
      setIndividual(data);
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCardClick = (problems) => {
    if (problems) {
      const individualData = problems.split(" ");
      const filtered = problemss.filter(problem => individualData.includes(problem.prob_no));
      setFilterData(filtered);
      setSelectedProblems(individualData);
    } else {
      setSelectedProblems([]);
      setFilterData([]); // 선택된 문제가 없을 경우 filterData를 빈 배열로 설정
    }
  };

  return (
    <div>
      <div className="m-4">
        <h3>개인알고리즘</h3>
      </div>
      <div className="row content">
        <div className="col-3" style={{ height: "calc(100vh - 150px)" }}>
          <PerfectScrollbar>
            {individual.map((data, index) => (
              <div key={index}
                onClick={() => handleCardClick(data.problems)} // Click handler 
                className="card mb-3 me-3 bg-white rounded border-0 card">
                <div
                  className="card-body shadow-sm"
                  style={{
                    border: "1px solid #f7f7f7",
                    borderRadius: "2px",
                    fontSize: "13.5px",
                  }}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      height="28"
                      width="28"
                      src={data.image}
                      className="rounded user-avatar"
                      alt="User Avatar"
                    />
                    <img
                      height="15"
                      src={`${process.env.PUBLIC_URL}/assets/img/icon/${data.tier}.png`}
                      className="rounded"
                      alt="Trophy Icon"
                      style={{
                        position: "absolute",
                        bottom: "3px",
                        right: "2px",
                        transform: "translate(50%, 50%)",
                      }}
                    />
                  </div>
                  <p className="font-weight-bold d-flex">{data.github_id}</p>
                  <img
                    className="me-1"
                    src={baekjoonLogo}
                    style={{
                      width: "20px",
                      borderRadius: "3px",
                    }}
                  />
                  <small className="text-muted">
                    해결한 문제 {data.sol_prob_cnt}건
                  </small>
                </div>
              </div>
            ))}
          </PerfectScrollbar>
        </div>
        <div className="col-9" style={{ height: "calc(100vh - 150px)", overflow: "hidden" }}>
        {(filterData||problemss).length}
          <PerfectScrollbar>

            {/* <div
              className="flourish-embed flourish-chart"
              data-src="visualisation/11965768"
            /> */}

            <table className="table">
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-1">번호</th>
                  <th className="col-2">제출</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {(filterData||problemss).map((problem, index) => (
                  <tr className='align-middle' key={index}>
                    <td>{(filterData||problemss).length - index}</td>
                    <td><a href={`https://www.acmicpc.net/problem/${problem.prob_no}`} target="_blank">{problem.prob_no}</a></td>
                    <td className="d-flex">
                      {(problem.ids.split(' ').map((id, idx) => (
                        <div key={idx}>
                          <img
                            height="20"
                            width="20"
                            src={id}
                            className="me-1 rounded-circle user-avatar"
                            alt="User Avatar"
                          />
                        </div>
                      )))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default PersonalAlgorithmPage;
