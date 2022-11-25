import styled from '@emotion/styled';
import CloseButton from '@components/input/CloseButton';
import { useEffect, useRef, useState } from 'react';

export default function ChatContainer(setModalState) {
  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef();

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
    <ModalContainer>
      <TopSection className="top-section">
        <CloseButtonSection>
          <a
            onClick={() => {
              setModalState(false);
            }}
          >
            <CloseButton />
          </a>
        </CloseButtonSection>
      </TopSection>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  z-index: 999;

  position: fixed;
  bottom: 1rem;
  right: 1rem;
  /* transform: translate(-50%, -50%); */

  background-color: white;
  border: 0px;
  border-radius: 20px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 300px;
  height: 600px;
`;
const TopSection = styled.div`
  padding: 5px 15px;
`;

const CloseButtonSection = styled.div`
  padding-top: 5px;
  text-align: right;
`;
