import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/eventPrize';

export default function EventSampleModal({event}) {

  const modalRef = useRef();
  console.log('event', event);

  useEffect(() => {
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalState(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          {/* <div className="container px-5 py-24 mx-auto">
            <div
              className="event-detail-startAt"
              style={{ fontSize: 'xx-large', padding: '10px' }}
            >
              {event.eventInfo && event.eventInfo.title}
            </div>
            <div
              className="event-detail-startAt"
              style={{ fontSize: 'large', padding: '10px' }}
            >
              {'응모 기간 : '}
              {getDateTime(event.eventInfo.startAt)}
              {' ~ '}
              {getDateTime(event.eventInfo.endAt)}
            </div>
            <div className="event-detail-img" style={{ marginBottom: '100px' }}>
              <img src={event.eventImage.eventDetailImg} style={{ width: '100%' }} />
            </div>

            <EventPrizeListSection className="prize-list">
              {event.eventPrizes &&
                event.eventPrizes.map((prize) => {
                  return (
                    <EventPrize/>
                  );
                })}
            </EventPrizeListSection>
          </div> */}
        </section>
      </ModalContainer>
    </BackgroundDIM>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
