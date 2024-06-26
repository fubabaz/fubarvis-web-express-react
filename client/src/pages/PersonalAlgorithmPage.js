import React, { useEffect, useState } from "react";
import AlgorithmService from "../services/algorithmService";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // PerfectScrollbar CSS 파일 로드

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
              <div class="card mb-2 mx-4">
                <div class="card-body">
                  <img
                    height="28"
                    width="28"
                    src={data.image}
                    className="mx-2 mb-1 rounded user-avatar"
                    alt="User Avatar"
                  />
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