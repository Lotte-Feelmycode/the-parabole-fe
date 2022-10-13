import styled from '@emotion/styled';
import { ICON_SEARCH_MAGNIFY } from '@utils/constants/icons';
import { useState } from 'react';
const SearchBar = ({ placeholder, onKeyUp, onChange, onInput }) => {
  const [searchValue, setSearchValue] = useState('');

  const onClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Bar>
      <InputDiv>
        <input
          className="hover:bg-gray-100"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
        />
      </InputDiv>

      <button onClick={onClickHandler}>
        <IconSpan>
          <img src={ICON_SEARCH_MAGNIFY} />
        </IconSpan>
      </button>
    </Bar>
  );
};

const Bar = styled.div`
  cursor: text;
  //background-color: #F0F6F6;
  border: 0.1px solid #0084ff9e;
  border-radius: 2px;
  display: flex;
  padding: 10px 16px;
  height: 38px;
  //margin-left: 10px;
  margin-right: 3px;
  @media (max-width: 1024px) {
    display: none;
  }
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
