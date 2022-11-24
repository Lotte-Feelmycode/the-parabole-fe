import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useState, useEffect } from 'react';
import { ChatPresenter } from './ChatPresenter';

let sockJS = new SockJS('http://localhost:8080/ws');
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

export default function ChatContainer({}) {
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/public', (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [contents]);

  const handleEnter = (username, content) => {
    const newMessage = { username, content };
    stompClient.send('/app/sendMessage', {}, JSON.stringify('_메시지_'));
    setMessage('');
  };

  const addMessage = (message) => {
    setContents((prev) => [...prev, message]);
  };

  return (
    <div className={'container'}>
      <ChatPresenter
        contents={contents}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
}
