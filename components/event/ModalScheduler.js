import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import EventScheduler from '@components/Scheduler/scheduler';
import { LinePink } from '@components/input/Button';

export default function ModalScheduler({
  setModalState,
  scheduleList
}) {
  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef();

  // useEffect(() => {
  //   const handler = () => {
  //     // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setModalState(false);
  //     }
  //   };

  //   // 이벤트 핸들러 등록
  //   document.addEventListener('mousedown', handler);
  //   // document.addEventListener('touchstart', handler); // 모바일 대응

  //   return () => {
  //     // 이벤트 핸들러 해제
  //     document.removeEventListener('mousedown', handler);
  //     // document.removeEventListener('touchstart', handler); // 모바일 대응
  //   };
  // });


  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <TopSection>
          <div className='text-center mt-8 font-bold text-2xl text-black-600'>기등록된 선착순 이벤트 스케쥴 조회</div>
          <div className='text-center text-gray-500 my-2'>- 일주일에 한번만 진행할 수 있습니다. <br/>-선착순 이벤트는 정각부터 50분간 진행됩니다. </div>
        </TopSection>
        <DetailSection>
          <ModalTableSection>
            <EventScheduler input={scheduleList}/>
          </ModalTableSection>
        </DetailSection>
        <div className='flex justify-center my-6'>
          <LinePink
              buttonText="확인"
              onClickFunc={closeModal}
          />
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
`

const ModalContainer = styled.div`
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 8px;

  /* 모달창 크기 */
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
`;
