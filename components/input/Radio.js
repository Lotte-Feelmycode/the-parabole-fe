import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import { useState } from 'react';

const Radio = ({ name, value, text, onChange }) => {
  const [inputStatus, setInputStatus] = useState(null);

  const handleRadiobutton = (radioBtnValue) => {
    setInputStatus(radioBtnValue);
    onChange && onChange({ args: inputStatus });
  };

  return (
    <Div>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={inputStatus === value}
        onChange={() => handleRadiobutton(value)}
      ></RadioInput>
      <Label htmlFor={value}>{text}</Label>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-items: center;
  flsx-direction: row;
`;
const Label = styled.label`
  font-size: 16px;
  line-height: 2rem;
  padding: 0.2em 0.4em;
  cursor: pointer;
`;
const RadioInput = styled.input`
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.1s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  ${(props) =>
    props.checked &&
    `
      &:checked {
        border: 0.35em solid tomato;  
      }   
    `}
`;

export default Radio;
