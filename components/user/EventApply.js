import { getTime } from '@utils/functions';
import styled from '@emotion/styled';
import * as btn from '@components/input/Button';

export default function EventApply({ applyInfo }) {
  return (
    <div style={{ paddingBottom: '3rem', width: '764px' }}>
      <ApplyTime>
        <div style={{ float: 'left' }}>
          {getTime(applyInfo.eventTimeStartAt)}
          <strong>응모</strong>
        </div>
        <div style={{ float: 'right' }}>
          {applyInfo.status === 0 ? (
            <div>시작전 이벤트</div>
          ) : applyInfo.status === 1 ? (
            <div>진행중인 이벤트</div>
          ) : (
            <div>종료된 이벤트</div>
          )}
        </div>
      </ApplyTime>

      <div
        className="flex flex-wrap"
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          width: '764px',
          outline: 'auto',
        }}
      >
        <br />
        <div
          className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col"
          style={{
            width: '21.5rem',
            height: '190px',
            marginLeft: '14px',
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
          <div style={{ paddingBottom: '1rem', fontSize: 'xx-large' }}>
            {applyInfo.eventTitle}
          </div>

          <div style={{ paddingBottom: '1rem' }}>
            {getTime(applyInfo.startAt)} ~<br />
            {getTime(applyInfo.endAt)}
          </div>
          <div>
            <btn.LineBlue buttonText={'응모 상세정보'} />
          </div>
        </div>

        <div className="event-check"></div>
      </div>
    </div>
  );
}
const EventImg = styled.img`
  height: 153px;
  margin-left: 1.1rem;
  margin-top: 1rem;
`;

const ApplyTime = styled.div`
  outline: auto;
  background-color: #d6d6d6;
  height: 64px;
  width: 764px;
  padding: 1rem;
  display: table-cell;
  vertical-align: middle;
`;
