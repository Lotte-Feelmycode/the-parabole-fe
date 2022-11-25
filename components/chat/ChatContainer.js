import styled from '@emotion/styled';
import CloseButton from '@components/input/CloseButton';

export default function ChatContainer({ setModalState }) {
  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  return (
    <ModalContainer>
      <TopSection className="top-section">
        <CloseButtonSection>
          <a onClick={closeModal}>
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
