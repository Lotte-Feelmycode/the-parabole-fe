import { getTime } from '@utils/functions';
import styled from '@emotion/styled';

export default function EventApply({ applyInfo }) {
  console.log(applyInfo);
  return (
    <div style={{ paddingBottom: '3rem' }}>
      <ApplyTime>
        <div style={{ float: 'left' }}>
          <strong>응모 일시: </strong> {getTime(applyInfo.eventTimeStartAt)}
        </div>
        <div style={{ float: 'right' }}>
          {applyInfo.status === 0 ? (
            <div>이벤트 상태: 시작전</div>
          ) : applyInfo.status === 1 ? (
            <div>이벤트 상태: 진행중</div>
          ) : (
            <div>이벤트 상태: 종료</div>
          )}
        </div>
      </ApplyTime>

      <div
        className="flex flex-wrap"
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          width: '1000px',
          outline: 'auto',
        }}
      >
        <br />
        <div
          className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col"
          style={{
            width: '15rem',
            height: '190px',
            marginLeft: '40px',
            backgroundColor: '#F6F6F6',
          }}
        >
          <div
            className="mt-1 text-gray-500 text-sm"
            style={{ width: '19rem' }}
          >
            <EventImg src={applyInfo.eventImg} />
          </div>
        </div>
        <div style={{ marginLeft: '40px', marginTop: '15px' }}>
          <div style={{ paddingBottom: '1rem' }}>
            <strong>이벤트 제목: </strong> {applyInfo.eventTitle}
          </div>

          <div style={{ paddingBottom: '1rem' }}>
            <strong>이벤트 기간:</strong> {getTime(applyInfo.startAt)} ~{' '}
            {getTime(applyInfo.endAt)}
          </div>
        </div>

        <div className="event-check"></div>
      </div>
    </div>
  );
}
const EventImg = styled.img`
  width: 183px;
  height: 149px;
  margin-left: 1.7rem;
  margin-top: 1rem;
`;

const ApplyTime = styled.div`
  outline: auto;
  background-color: #d6d6d6;
  height: 64px;
  width: 1000px;
  padding: 1rem;
  display: table-cell;
  vertical-align: middle;
`;
