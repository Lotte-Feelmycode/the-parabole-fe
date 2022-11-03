import styled from '@emotion/styled';
import { ThemeGray3, ThemeGray4 } from '@utils/constants/themeColor';
import Chat from './Chat';

export default function SellerChatSection() {
  const myChat = {
    userId: 1,
    nickname: '참여자닉네임',
    message:
      '이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?',
  };
  const otherChat = {
    userId: 3,
    nickname: '참여자닉네임',
    message: '내일 종료됩니다.',
  };
  return (
    <>
      <Div>
        <ChatSectionTitle>
          <Title>사용자님의 1:1 문의</Title>
        </ChatSectionTitle>
        <div>
          <ChatDate>2022년 10월 27일</ChatDate>
          <Chat chats={myChat} />
          <Chat chats={otherChat} />
        </div>
        <Input>뭐야</Input>
      </Div>
    </>
  );
}

const Input = styled.div`
  position: relative;
  bottom: 10px;
  height: 5rem;
  background-color: red;
`;
const ChatSectionTitle = styled.div`
  border-bottom: 1px solid ${ThemeGray3};
  background-color: white;
  width: 100%;
  height: 5.6rem;
  font-weight: bold;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
  font-size: 1.8rem;
`;
const ChatDate = styled.div`
  text-align: center;
  padding-top: 1rem;
`;
const Div = styled.div`
  border-radius: 0rem 0.3rem 0.3rem 0rem;
  height: 46.1rem;
  border-top: 1px solid ${ThemeGray3};
  border-right: 1px solid ${ThemeGray3};
  border-bottom: 1px solid ${ThemeGray3};
`;

const Title = styled.div`
  background-color: white;
  width: 100%;
  height: 4rem;
  padding: 1.5rem;
  font-weight: bold;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
  font-size: 1.8rem;
`;
