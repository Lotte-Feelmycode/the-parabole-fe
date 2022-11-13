import styled from '@emotion/styled';
import {
  ThemeGray2,
  ThemeGray1,
  ThemeBlueWhite,
} from '@utils/constants/themeColor';

export default function Input({ type, value, onChange, onInput, attr, css }) {
  return (
    <InputCSS
      type={type}
      value={value}
      onChange={onChange}
      onInput={onInput}
      {...attr}
      css={css}
    />
  );
}

const InputCSS = styled.input`
  max-width: 100%;
  color: black;
  border: 1px solid ${ThemeGray1};
  font-size: 12px;
  padding: 1% 2%;
  margin-top: 5px;
  margin-bottom: 25px;
  ${(props) => props.css};
`;

export function LargeInput({ type, value, onChange, onInput, attr, css }) {
  return (
    <LargeInputCSS
      type={type}
      value={value}
      onChange={onChange}
      onInput={onInput}
      {...attr}
      css={css}
    />
  );
}

const LargeInputCSS = styled.input`
  padding: 0 10px;
  max-width: 100%;
  height: 40px;
  color: black;
  border: 1px solid ${ThemeGray2};
  border-radius: 5px;
  font-size: 1rem;
  ${(props) => props.css};

  &:hover {
    background: ${ThemeBlueWhite};
  }

  &:focus {
    background: ${ThemeBlueWhite};
  }
`;
