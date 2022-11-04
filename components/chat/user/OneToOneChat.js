import styled from '@emotion/styled';
import {
  ThemeBlueWhite,
  ThemeGray1,
  ThemeGray3,
} from '@utils/constants/themeColor';
import { LargeInput } from '@components/input/Input';

export default function OneToOneChat({ closeChatFunction, seller }) {
  return (
    <ChatModalContainer>
      <TopSection>
        <button onClick={closeChatFunction}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill={ThemeGray1}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fillRule="nonzero"
              d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
            />
          </svg>
        </button>
      </TopSection>
      <DetailSection>
        <ModalTitleSection>
          <p>{'[' + seller.storeName + ']'}</p>
        </ModalTitleSection>
        <ChatListSection></ChatListSection>
        <ChatInputSection>
          <InputSection>
            <LargeInput
              css={{
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '100%',

                border: 'none',
              }}
            />
          </InputSection>
          <SendSection>
            <a>
              <p>보내기</p>
            </a>
          </SendSection>
        </ChatInputSection>
      </DetailSection>
    </ChatModalContainer>
  );
}

const ChatModalContainer = styled.div`
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: fixed;
  bottom: 20px;
  right: 20px;

  /* 모달창 디자인 */
  background-color: ${ThemeBlueWhite};
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 크기 */
  @media (max-width: 1024px) {
    width: 90%;
    height: 90%;
  }
  @media (min-width: 1024px) {
    width: 500px;
    height: 600px;
  }
`;

const TopSection = styled.div`
  text-align: right;
  padding: 5px 10px;
`;

const DetailSection = styled.div`
  padding: 0 30px;
`;

const ModalTitleSection = styled.div`
  padding: 8px 0;
  background-color: white;
  font-size: 1.5rem;
  font-weight: bolder;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid ${ThemeGray3};
`;

const ChatListSection = styled.div`
  margin: 20px 0;
  height: 400px;
  background-color: white;
  border: 1px solid ${ThemeGray3};
  overflow: auto;
`;

const ChatInputSection = styled.div`
  margin: 20px 0;
  background-color: white;
  border: 1px solid ${ThemeGray3};
  display: flex;
`;

const InputSection = styled.div`
  width: 100%;
`;

const SendSection = styled.div`
  font-size: large;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  white-space: nowrap;
`;
