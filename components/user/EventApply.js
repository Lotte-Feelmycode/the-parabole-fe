import { getDateTime } from '@utils/functions';
import styled from '@emotion/styled';
import { APPLY_TYPE } from '@utils/constants/types';

export default function EventApply({ applyInfo }) {
  return (
    <div style={{ paddingBottom: '3rem', width: '764px' }}>
      <div
        className="flex flex-wrap"
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          width: '764px',
          border: '0.1px solid #D6D6D6',
          borderRadius: '2rem',
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

          <div>
            {applyInfo.status === APPLY_TYPE.eventBegin ? (
              <div>시작전 이벤트</div>
            ) : applyInfo.status === APPLY_TYPE.eventProceeding ? (
              <div
                style={{
                  borderRadius: '2rem',
                  backgroundColor: '#C2E0FF',
                  paddingLeft: '1rem',
                  width: '132px',
                  paddingTop: '0.1rem',
                  marginBottom: '1rem',
                }}
              >
                <strong>진행중인 이벤트</strong>
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '2rem',
                  backgroundColor: '#C2E0FF',
                  paddingLeft: '1rem',
                  width: '122px',
                  paddingTop: '0.1rem',
                  marginBottom: '1rem',
                }}
              >
                <strong>종료된 이벤트</strong>
              </div>
            )}
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            {getDateTime(applyInfo.startAt)} ~<br />
            {getDateTime(applyInfo.endAt)}
          </div>
          <div></div>
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
