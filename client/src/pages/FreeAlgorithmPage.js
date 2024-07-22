import React, { useState, useEffect, useRef } from 'react';
import AlgorithmService from "../services/algorithmService";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import baekjoonLogo from "../assets/img/logo/baekjoon-logo.png";
import b2enLogo from "../assets/img/logo/b2en-logo.svg";
import problemss from "../data/problems-group.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import individual from "../data/problems-individual-info.json";

function FreeAlgorithmPage() {
  const chartRef = useRef(null);
  const [filterData, setFilterData] = useState(problemss);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState({
    github_id: "비투엔",
    image: b2enLogo,
    tier: "",
    sol_prob_cnt: 0,
    bronze_cnt: 0,
    silver_cnt: 0,
    gold_cnt: 0,
    platinum_cnt: 0,
    diamond_cnt: 0,
    ruby_cnt: 0,
    problems: ""
  });

  //const [chartStatus, setChartStatus] = useState('loading');
  

  useEffect(() => {
    const loadFlourishScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://public.flourish.studio/resources/embed.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeChart = () => {
      if (typeof window.Flourish === 'undefined') {
        throw new Error('Flourish is not defined');
      }
      return new Promise((resolve, reject) => {
        try {
          window.Flourish.embed(
            { src: 'visualisation/11965768', container: chartRef.current },
            (embed) => resolve(embed)
          );
        } catch (error) {
          reject(error);
        }
      });
    };

    const embedFallbackIframe = () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://flo.uri.sh/visualisation/11965768/embed';
      iframe.width = '100%';
      iframe.height = '300';
      iframe.style.border = 'none';
      chartRef.current.innerHTML = '';
      chartRef.current.appendChild(iframe);
    };

    const setupChart = async () => {
      try {
        await loadFlourishScript();
        await initializeChart();
      } catch (error) {
        console.error('Error in chart setup:', error);
        embedFallbackIframe();
      }
    };

    setupChart();

    return () => {
    
    };
  }, []);


  const updateData = async () => {
    try {
      await AlgorithmService.individual();
      toast.success('오옷..! 최신 데이터로 가져왔어요! 😀');
    } catch (error) {
      toast.error('이런.. 데이터를 불러오는 중 오류가...');
      console.error('Error fetching data:', error);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body style={{
        width: 'auto',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333',
        fontSize: '13px',
        lineHeight: '1.2'
      }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          각자 백준 온라인 저지에서
        </div>
        풀고 싶은 문제를 자유롭게 풀어 주세요! 아주 쉽고 의미 없는 문제도 상관없어요.
        <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
          활동의 목표는
        </div>
        첫 번째, 개인 랭킹의 상승이고 두 번째, 비투엔의 월별 목표 랭킹 달성이에요.
        <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
          자유가 높은 활동이지만
        </div>
        첫 번째 개인 활동 결과에 의해, 두 번째 공동의 결과가 정해지기 때문에, 자발적고 자유롭지만 책임감이 있는 활동 참여가 중요합니다 😊
      </Popover.Body>
    </Popover>
  );
  


  const handleCardClick = (data, index) => {
    setSelectedIndex(index);
    setSelectedUser(data);
    if (data.problems) {
      const individualData = data.problems.split(" ");
      const filtered = problemss.filter((problem) =>
        individualData.includes(problem.prob_no)
      );
      setFilterData(filtered);
    } else {
      setFilterData([]);
    }
  };

  return (
    <div>
     <div className="m-4 d-flex justify-content-between align-items-center">
        <h3 className="d-flex align-items-center">
          자유알고리즘
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover}>
            <FontAwesomeIcon 
              icon={faQuestionCircle} 
              style={{ marginLeft: '10px', cursor: 'pointer' }} 
            />
          </OverlayTrigger>
        </h3>
        <button className="btn btn-sm btn-primary" onClick={updateData}>데이터 갱신</button>
      </div>
      <div className="row content">
        <div className="col-3" style={{ height: "calc(100vh - 150px)" }}>
          <PerfectScrollbar>
            {individual.map((data, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(data, index)}
                className="card mb-3 me-3 rounded border-0 card"
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedIndex === index ? "#f8f8f8" : "#ffffff",
                }}
              >
                <div
                  className="card-body shadow-sm"
                  style={{
                    border:
                      selectedIndex === index
                        ? "1px solid #e3e3e3"
                        : "1px solid #f7f7f7",
                    borderRadius: "5px",
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
                      alt='Avatar'
                      className="rounded"
                    />
                    <img
                      height="15"
                      src={`${process.env.PUBLIC_URL}/assets/img/icon/${data.tier}.svg`}
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
                    alt="Baekjoon Logo"
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
          className="col-9"
          style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}
        >
          <div
            className="card-body shadow-sm px-4 pt-3"
            style={{
              border: "1px solid #f7f7f7",
              borderRadius: "2px",
              fontSize: "13.5px",
              height: "calc(100% - 60px)",
              overflow: "hidden"
            }}
          >
            {selectedUser && (
              <div className="row">

                <div className="col-5">
                  <img
                    style={{
                      height: selectedIndex === null ? "62px" : "35px",
                      width: selectedIndex === null ? "100px" : "35px",
                      cursor: "pointer",
                    }}
                    src={selectedUser.image}
                     alt="Avatar"
                    className="rounded user-avatar"
                  />
                  {selectedIndex !== null && (
                    <p className="h6 font-weight-bold d-flex">{selectedUser.github_id}</p>
                  )}
                  <p className="h4 font-weight-bold d-flex">
                    {(filterData || problemss).length}건 해결!
                  </p>
                </div>
                {selectedIndex !== null && (
                  <div className="col-7 d-flex justify-content-start align-items-center text-center">
                    <div className="me-4" style={{ color: '#ad5600' }}>
                      <div className="h6">Bronze</div>
                      <div className="h4">{selectedUser.bronze_cnt}</div>
                    </div>
                    <div className="me-4" style={{ color: '#435f7a' }}>
                      <div className="h6">Silver</div>
                      <div className="h4">{selectedUser.silver_cnt}</div>
                    </div>
                    <div className="me-4" style={{ color: '#ec9a00' }}>
                      <div className="h6">Gold</div>
                      <div className="h4">{selectedUser.gold_cnt}</div>
                    </div>
                    <div className="me-4" style={{ color: '#27e2a4' }}>
                      <div className="h6">Platinum</div>
                      <div className="h4">{selectedUser.platinum_cnt}</div>
                    </div>
                    <div className="me-4" style={{ color: '#00b4fc' }}>
                      <div className="h6">Diamond</div>
                      <div className="h4">{selectedUser.diamond_cnt}</div>
                    </div>
                    <div className="me-4" style={{ color: '#ff0062' }}>
                      <div className="h6">Ruby</div>
                      <div className="h4">{selectedUser.ruby_cnt}</div>
                    </div>
                  </div>
                )}


                <div
                  ref={chartRef}
                />
              </div>
            )}

            <PerfectScrollbar style={{ height: "calc(100% - 60px)" }}>
              <table className="table">
                <tbody style={{ fontSize: "13px" }}>
                  {(filterData || problemss).map((problem, index) => (
                    <tr className="align-middle" key={index}>
                      <td>
                        <a
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "rgb(0, 159, 107)",
                          }}
                          href={`https://www.acmicpc.net/problem/${problem.prob_no}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {problem.prob_no}
                        </a>
                      </td>
                      <td className="d-flex">
                        {problem.ids.split(" ")
                         .sort((a, b) => {
                          if (a === selectedUser.image) return -1;
                          if (b === selectedUser.image) return 1;
                          return 0;
                        })
                        .map((id, idx) => (
                          <div key={idx}
                          className={selectedUser.image === id ? 'me-5' : ''}
                          ><img
                              height={selectedUser.image === id ? "35" : "20"}
                              width={selectedUser.image === id ? "35" : "20"}
                              src={id}
                              alt="Avatar"
                              className="me-2 rounded-circle user-avatar"
                            />
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PerfectScrollbar>
          </div>
        </div>
        <ToastContainer style={{ fontSize: '14px' }}
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default FreeAlgorithmPage;
