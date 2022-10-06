import styled from '@emotion/styled';
import { ICON_SEARCH_MAGNIFY } from '@utils/constants/icons';
import { useState } from 'react';
const SearchBar = ({
  id,
  name,
  className,
  inputVal,
  text,
  onClickFunc,
  onKeyUp,
  onChange,
  onInput,
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Bar className={className}>
      <InputDiv>
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={text}
        ></Input>
      </InputDiv>

      <button onClick={onClickFunc}>
        <IconSpan>
          <img src={ICON_SEARCH_MAGNIFY}></img>
        </IconSpan>
      </button>
    </Bar>
  );
};

const Bar = styled.div`
  cursor: text;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  display: flex;
  padding: 10px 16px;
  width: 380px;
  height: 38px;
  margin-left: 10px;
  margin-right: 3px;
`;

const InputDiv = styled.div`
  flex: 1 1 0%;
  margin-right: 12px;
  line-height: normal;
`;

const IconSpan = styled.span`
  display: block;
  width: 20px;
  height: 20px;
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border-width: 0px;
  border-radius: 2px;
  outline-style: none;
  color: #a2a2a2;
  width: 100%;
  height: 100%;
  font-size: 14px;
`;

export default SearchBar;
