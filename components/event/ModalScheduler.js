import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import EventScheduler from '@components/Scheduler/scheduler';
import { LinePink } from '@components/input/Button';

export default function ModalScheduler({ setModalState, scheduleList }) {
  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  const modalRef = useRef();

  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <TopSection>
          <div className="text-center mt-8 font-bold text-2xl text-black-600">
            기등록된 선착순 이벤트 스케쥴 조회
          </div>
          <div className="text-center text-gray-500 my-2">
            - 일주일에 한번만 진행할 수 있습니다. <br />
            -선착순 이벤트는 정각부터 50분간 진행됩니다.{' '}
          </div>
        </TopSection>
        <DetailSection>
          <ModalTableSection>
            <EventScheduler input={scheduleList} />
          </ModalTableSection>
        </DetailSection>
        <div className="flex justify-center my-6">
          <LinePink buttonText="확인" onClickFunc={closeModal} />
        </div>
      </ModalContainer>
    </BackgroundDIM>
  );
}

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

  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 90%;
  }
  @media (min-width: 1024px) {
    width: 1000px;
  }
`;

const TopSection = styled.div`
  padding: 5px 15px;
`;

const DetailSection = styled.div`
  text-align: center;
`;

const ModalTableSection = styled.div`
  margin-top: 0;
  height: 60%;
`;
