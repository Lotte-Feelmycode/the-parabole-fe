import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/eventPrize';
import CloseButton from '@components/input/CloseButton';
import { NO_IMAGE } from '@utils/constants/images';
import { useRouter } from 'next/router';
import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import CommerceLayout from '@components/common/CommerceLayout';
import EventInfo from '@components/event/EvenInfo';
import EventPrizeContainer from '@components/event/EventPrizeContainer';
import { useGetToken } from '@hooks/useGetToken';

export default function EventSampleModal({ setModalState, event }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };
  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <section className="flex min-h-screen flex-col">
          <CloseButton onClickFunc={(e) => closeModal(e)} />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              className="w-screen"
              viewBox="0 0 1360 578"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="illustration-01"
                >
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="77.402%" />
                  <stop stopColor="#DFDFDF" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div>
          <main className="flex-grow cursor-not-allowed">
            <EventInfo eventInfo={event} eventImage={event.eventImage} />
            <EventPrizeContainer
              className="cursor-not-allowed"
              eventId={event.id}
              eventPrizes={event.eventPrizes}
              // eventType={eventInfo.type}
              // applyStatus={applyStatus}
              // headers={headers}
            />
          </main>
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

  height: 1000px;
`;

const TopSection = styled.div`
  padding: 5px 15px;
`;
