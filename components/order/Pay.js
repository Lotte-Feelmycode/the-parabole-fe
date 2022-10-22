import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';
import React, { useEffect, useState } from 'react';

export default function PayButton({ buttonText, onClickFunc, attr, css }) {
  const OriginSize = { height: '55px', padding: '0.5em 1.5em 0.5em 1.5em' };
  const size = OriginSize;
  const theme = color.BlueTheme;

  const [myCss, setMyCss] = useState(css);

  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={myCss}
    />
  );
}

const OutlineButtonComp = ({
  buttonText,
  onClickFunc,
  theme,
  size,
  attr,
  css,
}) => {
  return (
    <OutLineButtonStyled
      onClick={onClickFunc}
      theme={theme}
      size={size}
      {...attr}
      css={css}
    >
      {buttonText}
    </OutLineButtonStyled>
  );
};

const OutLineButtonStyled = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.mainColor};
  padding: ${(props) => props.size.padding};
  margin: 5px;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 17px;
  ${(props) => props.css};

  &:hover {
    background: ${(props) => props.theme.color2};
    cursor: pointer;
  }

  &:disabled {
    color: ${color.ThemeGray1};
    background: ${color.ThemeGray4};
    border: none !important;
    transform: none;
    cursor: default;
  }
`;
