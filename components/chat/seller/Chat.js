import styled from '@emotion/styled';
import { ThemeGray3 } from '@utils/constants/themeColor';
import { useEffect, useState } from 'react';

export default function SellerChat({ chats }) {
  // 내 id였을 때 위치 지정용으로 임의 설정
  const myId = 1;

  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(chats);
    setNickName(chats.nickname);
    setUserId(chats.userId);
    setMessage(chats.message);
  }, []);

  function chat(userId) {
    if (userId === myId) {
      return (
        <div
          style={{
            width: '40%',
            fontSize: '1rem',
            margin: '0 auto 0 1rem',
          }}
        >
          <ChatUser>{nickName}</ChatUser>
          <MyChat>{message}</MyChat>
        </div>
      );
    }
    return (
      <div
        style={{
          margin: '0 1rem 0 auto',
          width: '40%',
          fontSize: '1rem',
        }}
      >
        <ChatUser>{nickName}</ChatUser>
        <OtherChat>{message}</OtherChat>
      </div>
    );
  }
  // TODO: 참여자 id 숨겨놓기
  return <>{chat(userId)}</>;
}

const ChatUser = styled.div`
  margin-bottom: 0.5rem;
`;
const MyChat = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0 1rem 1rem 1rem;
  padding: 1rem;
  border: 1px solid ${ThemeGray3};
`;
const OtherChat = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1rem 0rem 1rem 1rem;
  padding: 1rem;
  border: 1px solid ${ThemeGray3};
`;
