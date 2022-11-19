import styled from '@emotion/styled';
import { ICON_SEARCH_MAGNIFY } from '@utils/constants/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ placeholder, onKeyUp, onChange, onInput }) => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const onClickHandler = () => {
    router.push({ pathname: '/product', query: { searchValue: searchValue } });
  };

  const handleOnKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      onClickHandler();
    }
  };

  return (
    <Bar>
      <InputDiv>
        <input
          className="w-full hover:bg-gray-100"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleOnKeyPress}
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
  margin: auto;
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

export default SearchBar;
