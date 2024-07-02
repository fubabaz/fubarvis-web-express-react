import React, { useEffect, useState } from 'react';
import AlgorithmService from '../services/algorithmService';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // PerfectScrollbar CSS 파일 로드
import throphyIcon from "../assets/img/icon/trophy.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import problems from "../data/problems.json";

function AlgorithmPage() {

  const handleCardClick = async () => {
    try {
      const data = await AlgorithmService.getProb();
      toast.success('오옷..! 최신 데이터로 가져왔어요! 😀');
      // 데이터 처리 로직 추가
    } catch (error) {
      toast.error('이런.. 데이터를 불러오는 중 오류가...');
      console.error('Error fetching data:', error);
    }
  };

  const renderStatusBadge = (status) => {
    let badgeClass = '';
    let badgeText = '';

    switch (status) {
      case 'OPEN':
        badgeClass = 'badge bg-success';
        badgeText = 'OPEN';
        break;
      case 'CLOSED':
        badgeClass = 'badge bg-danger';
        badgeText = 'CLOSED';
        break;
      default:
        badgeClass = 'badge bg-secondary';
        badgeText = '알 수 없음';
    }

    return <span className={badgeClass}>{badgeText}</span>;
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3>주간 알고리즘</h3>
        <button className="btn btn-sm btn-primary" onClick={handleCardClick}>데이터 갱신</button>
      </div>
      <div className="row content" style={{ height: '100%', width: '100%' }}>
        <PerfectScrollbar>
          <div style={{ height: 'calc(100vh - 64px)' }}>
            <table className="table">
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-1">상태</th>
                  <th className="col-2">제출자</th>
                  <th className="col-1">번호</th>
                  <th className="col-1">티어</th>
                  <th className="col-2">문제</th>
                  <th className="col-2">메모리</th>
                  <th className="col-2">수행시간</th>
                  <th className="col-2">코드길이</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {problems.map((problem, index) => (
                  <tr className='align-middle' key={index}>
                    <td>{index}</td>
                    <td>{renderStatusBadge(problem.status)}</td>
                    <td>
                      {problem.submitter_image && (
                        <img
                          height="28"
                          width="28"
                          src={problem.submitter_image}
                          className="mx-2 mb-1 rounded-circle"
                          alt="User Avatar"
                        />
                      )}
                    </td>
                    <td><a href={`https://www.acmicpc.net/problem/${problem.prob_no}`} target="_blank">{problem.prob_no}</a></td>
                    <td><img height="20" src={`${process.env.PUBLIC_URL}/assets/img/icon/${problem.prob_tier}.png`} alt="Problem Tier"/>
                    </td>
                    <td>
                      {problem.prob_title}
                    </td>
                    <td>
                      {problem.min_memory_image && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <img
                            height="28"
                            width="28"
                            src={problem.min_memory_image}
                            className="rounded-circle"
                            alt="User Avatar"
                          />
                          <img
                            height="18"
                            width="18"
                            src={throphyIcon}
                            className="rounded-circle"
                            alt="Trophy Icon"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              transform: "translate(50%, 50%)"
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {problem.min_time_image && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <img
                            height="28"
                            width="28"
                            src={problem.min_time_image}
                            className="rounded-circle user-avatar"
                            alt="User Avatar"
                          />
                          <img
                            height="18"
                            width="18"
                            src={throphyIcon}
                            className="rounded-circle"
                            alt="Trophy Icon"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              transform: "translate(50%, 50%)"
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {problem.min_code_len_image && (
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <img
                            height="28"
                            width="28"
                            src={problem.min_code_len_image}
                            className="rounded-circle user-avatar"
                            alt="User Avatar"
                          />
                          <img
                            height="18"
                            width="18"
                            src={throphyIcon}
                            className="rounded-circle"
                            alt="Trophy Icon"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              transform: "translate(50%, 50%)"
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PerfectScrollbar>
        <ToastContainer style={{fontSize:'14px'}}
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

export default AlgorithmPage;
