import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-toastify/dist/ReactToastify.css';

function GuidePayback() {
  return (
    <div>
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3>페이백 가이드</h3>
      </div>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <div className="user-list row content ms-4" style={{ height: "calc(100vh - 150px)" }}>
          <p className="h5">🙋‍♂️ 월 4,000 원 정도는 괜찮잖아?</p>
          <small className='text-muted'>
            활동 동기부여를 위해 우리는 월 <mark>4,000원</mark>씩 돈을 모아보기로 하였어요 🤑<br />
            일년에 48,000원!!<br />
            일년 기준으로 하루 약, 130원 정도에요.<br />
            괜찮죠? 🙏<br />
            <br />
            활동 결과를 포인트로 정산하여 입금하신 돈을 페이백 처리해요!<br />
            <br />
            <p className="h5 text-black">4,000중에 2,000</p>
            주간 알고리즘 활동 완료시 무조건 모두 페이백 돼요! 개인의 활동 여부로만 페이백 받을 수 있어요.<br />
            <br />
            <p className="h5 text-black">4개 항목별 500</p>
            <small>
              - 첫번째 주간 알고리즘 기한내 PR 제출<br />
              - 첫번째 주간 알고리즘 기한내 풀이 포스팅<br />
              - 두번째 주간 알고리즘 기한내 PR 제출<br />
              - 두번째 주간 알고리즘 기한내 풀이 포스팅<br />
            </small>
            <br />
            <strong>2,000P</strong><br />
            맴버들의 활동 결과에 따라 2000 +-@ 페이백 확률이 존재해요!<br />
            <br />
            <strong>10개 항목별 200P * N(참여인원)</strong><br />
            <small>
              - 첫번째 주간 알고리즘 문제 제출자<br />
              - 첫번째 주간 알고리즘 베스트 메모리<br />
              - 첫번째 주간 알고리즘 베스트 실행시간<br />
              - 첫번째 주간 알고리즘 베스트 숏 코드<br />
              - 두번째 주간 알고리즘 문제 제출자<br />
              - 두번째 주간 알고리즘 베스트 메모리<br />
              - 두번째 주간 알고리즘 베스트 실행시간<br />
              - 두번째 주간 알고리즘 베스트 숏 코드<br />
              - 월간 포스팅 합산 활성 일수가 가장 높은 멤버<br />
              - <s>M1 개인알고리즘 월단위 활동 포인트 랭킹 1위</s><br />
            </small>
            <br />
            단, 개인의 활동만이 아니라, 멤버들의 참여 상태에 따라 페이백이 발동 됩니다!<br />
            아래 조건 중 하나라도 달성하지 못하면 10개 항목 모두 페이백이 발동 하지 않아요!<br />
            <br />
            <small>
              <s>
              - 월간 비투엔 백준 목표 랭킹 달성<br />
              - 월간 티블로그 포스팅 평균 작성일 30이하<br />
              - 첫번째 주간 알고리즘 제출율 50% 이상<br />
              - 두번째 주간 알고리즘 제출율 50% 이상<br />
              </s>
            </small>
            <br />
            페이백 실패시, 금액 처리는 의견 주세요!<br />
            <br />
            <small>
              - 60% 동호회 공용 자금 축적<br />
              - 10% 첫번째 주간 알고리즘 문제 제출자<br />
              - 10% 두번째 주간 알고리즘 문제 제출자<br />
              - 10% 월단위 개인알고리즘 포인트 랭킹 1위<br />
              - 10% 월간 합산 활성 일수가 가장 높은 멤버<br />
            </small>
          </small>
        </div>
      </PerfectScrollbar>
    </div>
  );
}

export default GuidePayback;
