import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-toastify/dist/ReactToastify.css";

function GuidePayback() {
  return (
    <div>
      <div className="m-4 d-flex justify-content-between align-items-center">
        <h3>페이백 가이드</h3>
      </div>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <div
          className="user-list row content ms-4"
          style={{ lineHeight: "180%", height: "calc(100vh - 150px)" }}
        >
          <p className="h5">🙋‍♂️ 월 4,000 원 정도는 괜찮잖아?</p>
          <small className="text-muted">
            활동 동기부여를 위해 우리는 월 <mark>4,000원</mark>씩 돈을
            모아보기로 하였어요 🤑
            <br />
            일년에 48,000원!!
            <br />
            일년 기준으로 하루 약, 130원 정도에요.
            <br />
            괜찮죠? 🙏
            <br />
            <br />
            활동 결과를 정산하여 동호회 모임 통장으로 입금해주신 돈을 페이백
            처리해드려요!
            <br />
            <br />
            <p className="h5 text-black">보내주신 4,000원 중에 3,000원은요~</p>
            아래 활동을 유효 기간내 완료시 페이백! 온전히 개인의 활동으로 페이백
            받을 수 있어요.
            <br />
            이 활동을 완료하지 못하여 반환하지 못한 금액은 페이백 실패 금액으로
            전환되고, 다른 기준으로 페이백을 하게됩니다.
            <br />
            <br />
            <strong className="text-black">6개 항목별 500원</strong>
            <br />
            <ul>
              <li>
                첫번째 주간 알고리즘 기한내 PR 제출
              </li>
              <li>
                첫번째 주간 알고리즘 기한내 풀이 포스팅
              </li>
              <li>
                두번째 주간 알고리즘 기한내 PR 제출
              </li>
              <li>
                두번째 주간 알고리즘 기한내 풀이 포스팅
              </li>
              <li>
                팀 블로그 월간 한 건 이상의 포스팅
              </li>
              <li>
                토이 프로젝트 월간 한 건의 PR 제출 또는 Issue 등록
              </li>
              <br />
            </ul>
            <p className="h5 text-black">그럼 나머지 1,000원은?</p>
            맴버들의 활동 결과에 따라 1000 +-@ 페이백 확률이 존재해요!
            <br />
            <br />
            <strong className="text-black">
              10개 항목별 100P * N(참여맴버수)
            </strong>
            <br />
            <ul>
              <li>
                첫번째 주간 알고리즘 문제 제출자
              </li>
              <li>
                첫번째 주간 알고리즘 베스트 메모리
              </li>
              <li>
                첫번째 주간 알고리즘 베스트 실행시간
              </li>
              <li>
                첫번째 주간 알고리즘 베스트 숏 코드
              </li>
              <li>
                두번째 주간 알고리즘 문제 제출자
              </li>
              <li>
                두번째 주간 알고리즘 베스트 메모리
              </li>
              <li>
                두번째 주간 알고리즘 베스트 실행시간
              </li>
              <li>
                두번째 주간 알고리즘 베스트 숏 코드
              </li>
              <li>
                월간 포스팅 합산 활성 일수가 가장 높은 멤버
              </li>
              <li>
                <s>M1 개인알고리즘 월단위 활동 포인트 랭킹 1위</s>
              </li>
            </ul>
            <br />
            <s>
              단, 개인의 활동만이 아니라, 멤버들의 참여 상태에 따라 페이백이
              발동 됩니다!
              <br />
              아래 조건 중 하나라도 달성하지 못하면 10개 항목 모두 페이백이 발동
              하지 않아요!
              <br />
            </s>
            <br />
            <s>
              - 월간 비투엔 백준 목표 랭킹 달성
              <br />
              - 월간 티블로그 포스팅 평균 작성일 30이하
              <br />
              - 첫번째 주간 알고리즘 제출율 50% 이상
              <br />
              - 두번째 주간 알고리즘 제출율 50% 이상
              <br />
            </s>
            <br />
            <p className="h5 text-black">
              활동을 완료하지 못해서, 페이백을 실패하기도 해요😂
              <small className="text-muted">(바빠서 그런거겠죠..?)</small>
            </p>
            각 맴버의 페이백 실패로 회수하지 못한 금액이 발생하면, 아래 조건으로
            페이백 해요!
            <br />
            <br />
            <ul>
            <li>50% 동호회 공용 자금 축적</li>
            <li>10% 첫번째 주간 알고리즘 문제 제출자</li>
            <li>10% 두번째 주간 알고리즘 문제 제출자</li>
            <li>10% 월단위 개인 알고리즘 활동 점수가 가장 높은 맴버 1위</li>
            <li>10% 월간 합산 활성 일수가 가장 높은 멤버</li>
            <li>10% 월간 토이 프로젝트 PR 건수가 가장 높은 멤버(zeroradish 제외)</li>
            </ul>
          </small>
        </div>
      </PerfectScrollbar>
    </div>
  );
}

export default GuidePayback;
