import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/eventPrize';
import CloseButton from '@components/input/CloseButton';
import { NO_IMAGE } from '@utils/constants/images';

export default function EventSampleModal({ setModalState, event }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };
  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <CloseButton onClickFunc={(e) => closeModal(e)} />
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
              {getDateTime(event.startAt)}
              {' ~ '}
              {getDateTime(event.endAt)}
            </div>
            <div className="event-detail-img" style={{ marginBottom: '100px' }}>
              <img
                src={event.eventImage.eventDetailImg || NO_IMAGE}
                style={{ width: '100%' }}
              />
            </div>

            <EventPrizeListSection className="prize-list">
              {event.eventPrizes &&
                event.eventPrizes.map((prize) => {
                  return (
                    <EventPrize
                      className="cursor-not-allowd"
                      prize={prize}
                      eventId={event.id}
                      applyStatus=""
                    />
                  );
                })}
            </EventPrizeListSection>
          </div>
        </section>
      </ModalContainer>
    </BackgroundDIM>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  pointer-events: none;
`;

const BackgroundDIM = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  z-index: 999;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 40px 40px 60px 40px;

  background-color: #ffffff;
  border: 0px;
  border-radius: 20px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  width: 1000px;
  overflow-y: auto;

  height: 1200px;
`;

const TopSection = styled.div`
  padding: 5px 15px;
`;
