import { GET_DATA } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import EventApply from '@components/user/EventApply';
import styles from '@styles/Home.module.scss';
import * as btn from '@components/input/Button';
import styled from '@emotion/styled';
import { APPLY_TYPE } from '@utils/constants/types';
import Heading from '@components/input/Heading';

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

    if (status === APPLY_TYPE.eventProceeding) {
      list.map((event) => {
        if (event.status === APPLY_TYPE.eventProceeding) {
          setApplyInfo([event]);
        }
      });
    } else if (status == APPLY_TYPE.eventEnd) {
      list.map((event) => {
        if (event.status === APPLY_TYPE.eventEnd) {
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
        <Heading title={'사용자 이벤트 목록'} type="h1" />
        <div style={{ paddingBottom: '2rem' }}>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'전체'}
              onClickFunc={() => ApplyFunc(applyInfo, APPLY_TYPE.eventTotal)}
            />
          </SpanMargin>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'진행중'}
              onClickFunc={() =>
                ApplyFunc(applyInfo, APPLY_TYPE.eventProceeding)
              }
            />
          </SpanMargin>
          <SpanMargin>
            <btn.LineWhite
              buttonText={'종료'}
              onClickFunc={() => ApplyFunc(applyInfo, APPLY_TYPE.eventEnd)}
            />
          </SpanMargin>
          {/* TODO: 당첨 미당첨 구현 */}
          <SpanMargin>
            <btn.LineWhite buttonText={'미당첨'} />
          </SpanMargin>
        </div>
        <div style={{ paddingBottom: '2rem' }}></div>

        <h2 className={styles.section} style={{ fontSize: 'x-large' }}>
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
