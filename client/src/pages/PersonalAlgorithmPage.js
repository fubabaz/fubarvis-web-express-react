import React, { useEffect, useState } from "react";
import AlgorithmService from "../services/algorithmService";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // PerfectScrollbar CSS 파일 로드
import baekjoonLogo from "../assets/img/logo/baekjoon-logo.png";
import solvedLogo from "../assets/img/logo/solved-logo.png";

function HomePage() {
  const [individual, setIndividual] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.flourish.studio/resources/embed.js";
    script.async = true;
    document.body.appendChild(script);

    AlgorithmService.individual().then((data) => {
      console.log(data);
      setIndividual(data);
    });

    return () => {
      document.body.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  return (
    <div>
      <div className="m-4">
        <h3>개인알고리즘</h3>
      </div>

      <div className=" row  content">
        <div className="col-3" style={{ height: "calc(100vh - 150px)" }}>
          <PerfectScrollbar>
            {individual.map((data, index) => (
              <div class="card mb-3 me-3 bg-white rounded border-0 card">
                <div
                  class="card-body shadow-sm"
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

        <div
          className="col-9 flourish-embed flourish-chart"
          data-src="visualisation/11965768"
        />
      </div>
    </div>
  );
}

export default HomePage;
