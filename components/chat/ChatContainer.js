import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useState, useEffect } from 'react';
import { ChatPresenter } from './ChatPresenter';
import { isEmpty } from '@utils/functions';

let sockJS = new SockJS('http://localhost:8000/chat');
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

export default function ChatContainer({}) {
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/receive/chat', (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [contents]);

  const handleEnter = (username, content) => {
    if (isEmpty(message)) {
      alert('메시지를 입력해주세요');
      return;
    }
    const newMessage = { username, content };
    stompClient.send('/app/message', {}, JSON.stringify('_메시지_'));
    setMessage('');
    addMessage({
      username: localStorage.getItem('nickname'),
      content: message,
    });
  };

  const addMessage = (message) => {
    setContents((prev) => [...prev, message]);
  };

  const handleOnKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleEnter('username', message);
    }
  };

  return (
    <div className="container drop-shadow-xl rounded">
      <ChatPresenter
        contents={contents}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        username={username}
        setUsername={setUsername}
        setKeyPress={handleOnKeyPress}
      />
    </div>
  );
}
