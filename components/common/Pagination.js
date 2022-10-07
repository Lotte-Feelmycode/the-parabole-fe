import { useState } from 'react';
import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

export default function Pagination({
  totalPage,
  activePage,
  setNowPageFunction,
}) {
  if (!totalPage && totalPage < 1) return;
  if (!activePage && activePage < 0) return;
  console.log('totalPage : ' + totalPage);

  return (
    <Nav>
      <Button
        onClick={() => setNowPageFunction(activePage - 1)}
        disabled={activePage + 1 <= 1}
      >
        &lt;
      </Button>
      {Array(totalPage)
        .fill()
        .map((_, i) => (
          <NumButton
            key={i + 1}
            onClick={() => setNowPageFunction(i)}
            aria-current={activePage === i ? 'page' : null}
          >
            {i + 1}
          </NumButton>
        ))}
      <Button
        onClick={() => setNowPageFunction(activePage + 1)}
        disabled={activePage + 1 >= totalPage}
      >
        &gt;
      </Button>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  align-items: center;
  border: 1px solid ${color.ThemeGray};
  padding: 0 10px;
  margin: 0.5%;
  color: ${color.ThemeBlack2};
  font-size: 1rem;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  line-height: 32px;

  &:hover {
    background: ${color.MainColor1};
    color: ${color.ThemeWhite};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    display: none;
  }
`;

const NumButton = styled.button`
  align-items: center;
  border: none;
  margin: 0.5%;
  color: ${color.ThemeBlack2};
  font-size: 1rem;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  line-height: 32px;

  &:hover {
    background: ${color.MainColor1};
    color: ${color.ThemeWhite};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    display: none;
  }

  &[aria-current] {
    background: ${color.MainColor1};
    color: ${color.ThemeWhite};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
