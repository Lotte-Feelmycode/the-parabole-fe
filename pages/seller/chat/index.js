import Selectbox from '@components/input/SelectBox';
import styled from '@emotion/styled';
import {
  ThemeBlack,
  ThemeGray2,
  ThemeGray4,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { CHAT_STATE } from '@utils/constants/types';
import ChatList from '@components/chat/ChatList';
import ChatSection from '@components/chat/ChatSection';

export default function ChattingHome() {
  const chatQNA = {
    title: '화요일은 패션 DAY',
    message: '오늘 자정까지입니다',
    type: 'QNA',
  };
  const chatEVENT = {
    title: '화요일은 패션 DAY',
    message: '오늘 자정까지입니다',
    type: 'EVENT',
  };
  return (
    <>
      <Title>채팅 목록</Title>
      <ChatListSection>
        <ChatListTitle>
          채팅목록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Selectbox props={CHAT_STATE} defaultValue="EVENT" />
        </ChatListTitle>
        <ChatListContent>
          <ChatList chats={chatQNA} />
          <ChatList chats={chatQNA} />
          <ChatList chats={chatEVENT} />
        </ChatListContent>
      </ChatListSection>
      <ChatBox>
        <ChatSection />
      </ChatBox>
    </>
  );
}

const ChatListContent = styled.div`
  border-top: 1px solid ${ThemeGray2};
  background-color: ${ThemeGray4};
  height: 40.5rem;
  border-radius: 0 0 0.3rem 0.3rem;
`;

const ChatListTitle = styled.div`
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem;
  font-weight: bold;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  font-size: 1.8rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
  color: ${ThemeBlack};
  height: 6rem;
  margin: 3rem 3rem 0rem 3rem;
  padding: 1rem;
`;

const ChatListSection = styled.div`
  width: 22rem;
  height: 46.1rem;
  margin: 2rem 0rem 2rem 3rem;
  float: left;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  border: 1px solid ${ThemeGray2};
`;

const ChatBox = styled.div`
  border-radius: 0.3rem;
  background-color: ${ThemeGray5};
  float: left;
  height: 46rem;
  width: 80%;
  margin: 2rem 0rem 2rem 0rem;
`;
