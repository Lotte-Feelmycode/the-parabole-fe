import { SmallBlue } from '@components/input/Button';

export const ChatPresenter = ({
  contents,
  message,
  username,
  setMessage,
  setUsername,
  handleEnter,
}) => {
  return (
    <div className={'chat-box'}>
      <div className="header">
        {/* 유저이름 : */}
        {/* <input
          className="contents w-full h-72 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
      </div>
      <div className="w-full h-72 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">
        {contents.map((message) => (
          <div>
            {' '}
            {message.username} : {message.content}{' '}
          </div>
        ))}
      </div>
      <div className="mb-2">
        <input
          className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
          type="text"
          placeholder="input your messages..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <SmallBlue
        buttonText="채팅보내기"
        onClickFunc={(value) => handleEnter(username, value)}
      />
    </div>
  );
};
