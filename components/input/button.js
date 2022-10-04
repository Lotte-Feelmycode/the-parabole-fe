import styled from '@emotion/styled';

const PostButton = ({ id, name, buttonText, onClickFunc }) => {
  return (
    <div className="posting-button-container">
      <Button id={id} name={name} onClick={onClickFunc}>
        {buttonText}
      </Button>
    </div>
  );
};

const Button = styled.button`
  background-color: tomato;
  color: white;
  focus: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
`;

export default PostButton;
