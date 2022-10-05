import styled from '@emotion/styled';

const PostButton = ({ id, name, buttonText, onClickFunc, version }) => {
  var fontColor = '#ffffff';
  var backgroundColor = 'tomato';

  if (version == 'light') {
    fontColor = 'black';
    backgroundColor = '#f9f9f9';
  } else if (version == 'dark') {
    fontColor = '#ffffff';
    backgroundColor = '#000000';
  }

  return (
    <div>
      <Button
        id={id}
        name={name}
        onClick={onClickFunc}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  focus: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
`;

export default PostButton;
