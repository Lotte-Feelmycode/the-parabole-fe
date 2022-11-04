import styled from '@emotion/styled';
import {
  ThemeBlueWhite,
  MainBlue,
  ColorBlue2,
} from '@utils/constants/themeColor';

export default function GoToChatBtn({ openChatFunction, buttonText }) {
  return (
    <a onClick={openChatFunction}>
      <ChatBtn>{buttonText}</ChatBtn>
    </a>
  );
}

const ChatBtn = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;

  background-color: ${ThemeBlueWhite};
  color: ${MainBlue};
  border: 1px solid ${MainBlue};
  text-align: center;

  padding: 0.75rem 0;
  cursor: pointer;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 6px 4px rgba(0, 0, 0, 0.15);
    background: ${ColorBlue2};
    cursor: pointer;
  }
`;
