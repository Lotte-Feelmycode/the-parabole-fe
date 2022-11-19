import styled from '@emotion/styled';
import { MainPink } from '@utils/constants/themeColor';
import { useState } from 'react';

const Radio = ({
  formName,
  style,
  className,
  onChange,
  items,
  radioDirection = 'horizontal',
  InputClassName,
}) => {
  const [inputStatus, setInputStatus] = useState(null);
  const handleRadiobutton = (e) => {
    setInputStatus(e.target.value);
    onChange && onChange(e);
  };

  const radioList = items?.map(({ value, name }) => (
    <InputContainer
      key={value}
      style={style}
      className={`${radioDirection} ${className}`}
    >
      <Input
        type="radio"
        id={(value, name)}
        className={InputClassName}
        name={formName}
        checked={inputStatus === value}
        value={value}
        onChange={(e) => handleRadiobutton(e)}
      />
      <Label htmlFor={(value, name)}>{name}</Label>
    </InputContainer>
  ));

  return (
    <div style={{ display: radioDirection === 'vertical' ? 'block' : 'flex' }}>
      {radioList}
    </div>
  );
};

const Input = styled.input`
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.1s ease-in-out;
  margin-right: 10px;

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  ${(props) =>
    props.checked &&
    `
      &:checked {
        border: 0.35em solid ${MainPink};  
      }   
    `}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  &.vertical {
    margin-bottom: 20px;
  }

  &.horizontal {
    margin-right: 30px;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

export default Radio;
