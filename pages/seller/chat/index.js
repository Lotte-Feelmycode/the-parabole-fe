import Selectbox from '@components/input/SelectBox';
import styled from '@emotion/styled';
import {
  ThemeBlack,
  ThemeGray2,
  ThemeGray4,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { CHAT_STATE } from '@utils/constants/types';
import ChatList from '@components/chat/seller/ChatList';
import ChatSection from '@components/chat/seller/ChatSection';

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
      <ChatHome>
        <ChatListSection>
          <ChatListTitle>
            채팅목록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Selectbox props={CHAT_STATE} defaultValue="EVENT" />
          </ChatListTitle>
          <ChatListContent>
            <ChatList chats={chatQNA} />
            <ChatList chats={chatQNA} />
            <ChatList chats={chatEVENT} />
            <ChatList chats={chatQNA} />
            <ChatList chats={chatQNA} />
            <ChatList chats={chatEVENT} />
            <ChatList chats={chatQNA} />
            <ChatList chats={chatQNA} />
            <ChatList chats={chatEVENT} />
          </ChatListContent>
        </ChatListSection>
        <ChatBox>
          <ChatSection />
        </ChatBox>
      </ChatHome>
    </>
  );
}
const ChatHome = styled.div`
  display: flex;
`;
const ChatListContent = styled.div`
  overflow: auto;
  border-top: 1px solid ${ThemeGray2};
  background-color: ${ThemeGray4};
  height: 40.5rem;
  border-radius: 0rem 0rem 0.3rem 0.3rem;
`;

const ChatListTitle = styled.div`
  display: flex;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem;
  font-weight: bold;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  font-size: 1.8rem;
`;

const Title = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 3rem;
  color: ${ThemeBlack};
  height: 6rem;
  margin: 3rem 3rem 0rem 3rem;
  padding: 1rem;
`;

const ChatListSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
  height: 46.1rem;
  margin: 2rem 0rem 2rem 3rem;
  float: left;
  border-radius: 0.3rem 0rem 0rem 0.3rem;
  border: 1px solid ${ThemeGray2};
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;
  background-color: ${ThemeGray5};
  float: left;
  height: 46rem;
  width: 70%;
  margin: 2rem 0rem 2rem 0rem;
`;
