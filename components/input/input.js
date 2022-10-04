import styled from '@emotion/styled';

const Input = ({
  type,
  id,
  name,
  value,
  className,
  onChange,
  onInput,
  onKeyUp,
  onKeyDown,
  placeHolder,
  maxLength,
}) => {
  return (
    <InputCSS
      type={type}
      id={id}
      name={name}
      value={value}
      className={className}
      onChange={onChange}
      onInput={onInput}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      placeholder={placeHolder}
      maxLength={maxLength}
    ></InputCSS>
  );
};

const InputCSS = styled.input`
  color: black;
  border: 1px solid #cccccc;
  font-size: 12px;
  padding: 1% 2%;
  margin-top: 5px;
  margin-bottom: 30px;
`;

export default Input;
