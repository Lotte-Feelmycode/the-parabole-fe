import { GET_DATA } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import EventApply from '@components/user/EventApply';
import styles from '@styles/Home.module.scss';
import * as btn from '@components/input/Button';
import styled from '@emotion/styled';

export default function EventApplyList() {
  const userId = 2;
  const [applyInfo, setApplyInfo] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    GET_DATA(`/event/user/participant/${userId}`).then((res) => {
      if (res) {
        setApplyInfo(res);
        setTotal(res);
      }
    });
  }, [userId]);
  function ApplyFunc(list, status) {
    list = total;
    if (status === 1) {
      list.map((event) => {
        if (event.status === 1) {
          setApplyInfo([event]);
        }
      });
    } else if (status == 2) {
      list.map((event) => {
        if (event.status === 2) {
          setApplyInfo([event]);
        }
      });
    } else {
      setApplyInfo(total);
    }
  }
  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <h1 className={styles.section}>THE PARABOLE</h1>
        <h2 className={styles.section}>사용자 이벤트 목록</h2>
        <div style={{ paddingBottom: '2rem' }}>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'전체'}
              onClickFunc={() => ApplyFunc(applyInfo, 3)}
            />
          </SpanMargin>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'진행중'}
              onClickFunc={() => ApplyFunc(applyInfo, 1)}
            />
          </SpanMargin>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'종료'}
              onClickFunc={() => ApplyFunc(applyInfo, 2)}
            />
          </SpanMargin>
          {/* TODO: 당첨 미당첨 구현 */}
          <SpanMargin>
            <btn.LineWhite buttonText={'미당첨'} />
          </SpanMargin>
        </div>
        <div style={{ paddingBottom: '2rem' }}></div>

        <h2 className={styles.section}>
          나의 이벤트 참여 횟수: {applyInfo && applyInfo.length}
        </h2>
        <div className="flex flex-wrap -m-4" style={{ marginRight: '-4rem' }}>
          {applyInfo &&
            applyInfo.map((apply) => (
              <div classkey={apply.eventId} className="xl:w-1/2">
                <EventApply applyInfo={apply} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
const SpanMargin = styled.span`
  margin-right: 9px;
`;
