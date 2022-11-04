import { LinePink, Pink } from '@components/input/Button';
import styled from '@emotion/styled';
import { ThemeGray3, ThemeGray4 } from '@utils/constants/themeColor';
import { useEffect, useState } from 'react';
import Chat from './Chat';

export default function SellerChatSection() {
  const [chatList, setChatList] = useState([
    {
      userId: 1,
      nickname: '참여자닉네임',
      message:
        '이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?이벤트 종료는 언제인가요?',
    },
  ]);
  const [userId, setUserId] = useState(3);
  const [nickName, setNickName] = useState('사용자 이름');
  const [message, setMessage] = useState('');

  const handleOnKeyPress = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      const chat = {
        userId: userId,
        nickName: nickName,
        message: message,
      };
      setMessage('');
      console.log('CHATLIST', chatList);
      console.log(chat);
      setChatList([...chatList, chat]);
    }
  };

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  return (
    <>
      <FlexBlock>
        <Div>
          <ChatSectionTitle>
            <Title>사용자님의 1:1 문의</Title>
          </ChatSectionTitle>
          <FlexBlock style={{ overflow: 'auto' }}>
            <ChatDate>2022년 10월 27일</ChatDate>
            <FlexBlock>
              {chatList && chatList.map((chat) => <Chat chats={chat} />)}
            </FlexBlock>
          </FlexBlock>
        </Div>
        <InputBox>
          <InputSection>
            <InputDiv>
              <input
                className="w-full hover:bg-gray-100"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleOnKeyPress}
                style={{
                  height: '2.5rem',
                  widows: '100%',
                  fontSize: '1.5rem',
                  border: `1px solid ${ThemeGray3}`,
                  borderRadius: '0.5rem',
                  paddingLeft: '1rem',
                  overflow: 'auto',
                }}
              />
            </InputDiv>
          </InputSection>
          <LinePink buttonText={'전송'} css={buttonCss} />
          <Pink buttonText={'· · ·'} css={buttonCss} />
        </InputBox>
      </FlexBlock>
    </>
  );
}

const buttonCss = {
  margin: 'auto',
  height: '3rem',
  width: '5rem',
  fontSize: '1rem',
  fontWeight: 600,
};

const InputDiv = styled.div`
  flex: 1 1 0%;
  margin-right: 12px;
  line-height: normal;
`;
const FlexBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const InputSection = styled.div`
  display: inline-block;
  width: 80%;
  height: 3.5rem;
  margin: 1rem 2rem 1rem 3rem;
`;
const InputBox = styled.div`
  display: flex;
  position: relative;
  bottom: 5rem;
  height: 5rem;
  border-radius: 0.3rem;
  border: 1px solid ${ThemeGray4};
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
  display: flex;
  flex-direction: column;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
  height: 46.1rem;
  border-top: 1px solid ${ThemeGray3};
  border-right: 1px solid ${ThemeGray3};
  border-bottom: 1px solid ${ThemeGray3};
`;

const Title = styled.div`
  display: 'flex';
  background-color: white;
  width: 100%;
  height: 4rem;
  padding: 1.5rem;
  font-weight: bold;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
  font-size: 1.8rem;
`;
