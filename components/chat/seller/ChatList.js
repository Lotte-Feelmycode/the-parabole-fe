import styled from '@emotion/styled';
import {
  MainPink,
  PinkTheme,
  ThemeBlack,
  ThemeGray3,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { CHAT_STATE } from '@utils/constants/types';
import { getState } from '@utils/functions';
import { useState } from 'react';

export default function SellerChatList({ chats }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  function chatType(type) {
    if (type === 'EVENT') {
      return (
        <div
          style={{
            fontWeight: 'bold',
            color: MainPink,
            display: 'inline-block',
          }}
        >
          {getState(CHAT_STATE, 'EVENT')}
        </div>
      );
    }
    return (
      <div
        style={{
          fontWeight: 'bold',
          color: PinkTheme,
          display: 'inline-block',
        }}
      >
        {getState(CHAT_STATE, 'QNA')}
      </div>
    );
  }
  useState(() => {
    console.log(chats);
    setTitle(chats.title);
    setMessage(chats.message);
    setType(chats.type);
  }, chats);
  return (
    <>
      <ChatListContent>
        <ImgDiv>{/* <Img src="" alt="" /> */}</ImgDiv>
        <ContentDiv>
          <ContentBold>{title}</ContentBold>
          <br />
          <span>{message}</span>
        </ContentDiv>
        {chatType(type)}
      </ChatListContent>
    </>
  );
}

const ChatListContent = styled.div`
  border-bottom: 0.5px solid ${ThemeGray3};
  background-color: ${ThemeGray5};
  height: 5rem;
  width: 100%;
`;

const ContentDiv = styled.div`
  padding: 1rem;
  width: 12rem;
  display: inline-block;
  margin: 0px;
`;
const ContentBold = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;
const ImgDiv = styled.div`
  background-color: ${ThemeBlack};
  width: 50px;
  height: 50px;
  border-radius: 120px;
  margin: 0.8rem;
  float: left;
`;
