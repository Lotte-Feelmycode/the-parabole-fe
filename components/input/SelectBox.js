import { useState } from 'react';
import styled from '@emotion/styled';

export default function Selectbox({
  props,
  defaultValue,
  categoryName,
  onChange,
}) {
  const [selectValue, setSelectValue] = useState(defaultValue);
  const handleChange = (e) => {
    setSelectValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <Div>
      <select
        defaultValue={defaultValue === undefined ? '' : props.defaultValue}
        onChange={handleChange}
        value={selectValue}
      >
        {defaultValue === undefined && categoryName !== undefined && (
          <option>{categoryName}</option>
        )}
        {props.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </Div>
  );
}

const Div = styled.div`
  font-size: 1.4rem;
  display: inline-block;
  border: 2px solid gray;
  border-radius: 1rem;
  padding: 0.2rem;
`;
