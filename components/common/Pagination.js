import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

export default function Pagination({
  totalPage,
  activePage,
  setNowPageFunction,
  theme,
}) {
  if (!totalPage && totalPage < 1) return;
  if (!activePage && activePage < 0) return;

  return (
    <Nav>
      <Button
        onClick={() => setNowPageFunction(activePage - 1)}
        disabled={activePage + 1 <= 1}
        theme={theme}
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
            theme={theme}
          >
            {i + 1}
          </NumButton>
        ))}
      <Button
        onClick={() => setNowPageFunction(activePage + 1)}
        disabled={activePage + 1 >= totalPage}
        theme={theme}
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
  border: 1px solid ${color.ThemeGray4};
  padding: 0 10px;
  margin: 0.5%;
  color: ${color.ThemeGray4};
  font-size: 1rem;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  line-height: 32px;

  &:hover {
    border: ${(props) => props.theme.mainColor} 1px solid;
    color: ${(props) => props.theme.mainColor};
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
  padding: 0 7px;
  margin: 0.5%;
  color: ${color.ThemeBlack};
  font-size: 1rem;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  line-height: 32px;

  &:hover {
    background: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.white};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    display: none;
  }

  &[aria-current] {
    background: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
