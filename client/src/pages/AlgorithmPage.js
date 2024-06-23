import React, { useEffect, useState } from 'react';
import AlgorithmService from '../services/algorithmService';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // PerfectScrollbar CSS 파일 로드

function AlgorithmPage() {
  const [problems, setAlgorithm] = useState([]);

  useEffect(() => {
    AlgorithmService.getProb().then((data) => {
      console.log(data);
      setAlgorithm(data);
    });
  }, []);
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div className="m-4">
        <h3>주간 알고리즘</h3>
      </div>
      <div className="row content" style={{ height: '100%', width: '100%' }}>
        <PerfectScrollbar>
          <div style={{ height: 'calc(100vh - 64px)' }}>
            <table className="table">
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-2">제출자</th>
                  <th className="col-1">번호</th>
                  <th className="col">문제</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {problems.map((problem, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      {problem.image && (
                        <img
                          height="28"
                          width="28"
                          src={problem.image}
                          className="mx-2 mb-1 rounded-circle user-avatar"
                          alt="User Avatar"
                        />
                      )}                    
                    </td>
                    <td>{problem.prob_no}</td>
                    <td>{problem.prob_title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default AlgorithmPage;
