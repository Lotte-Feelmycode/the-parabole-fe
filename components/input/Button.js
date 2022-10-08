import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

const OriginSize = { height: '55px', padding: '0.5em 1.5em 0.5em 1.5em' };
const SmallSize = { height: '30px', padding: '0 0.5em' };

const BlueTheme = color.BlueTheme;
const PinkTheme = color.PinkTheme;
const whiteTheme = color.whiteTheme;

export const Blue = ({ buttonText, onClickFunc, css }) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const SmallBlue = ({ buttonText, onClickFunc, css }) => {
  const theme = BlueTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const LineBlue = ({ buttonText, onClickFunc, css }) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const Pink = ({ buttonText, onClickFunc, css }) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const SmallPink = ({ buttonText, onClickFunc, css }) => {
  const theme = PinkTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const LinePink = ({ buttonText, onClickFunc, css }) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const White = ({ buttonText, onClickFunc, css }) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const SmallWhite = ({ buttonText, onClickFunc, css }) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      css={css}
    />
  );
};

export const SmallLineWhite = ({ buttonText, onClickFunc, css }) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      {...css}
    />
  );
};

export const LineWhite = ({ buttonText, onClickFunc, css }) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      {...css}
    />
  );
};

const ButtonComp = ({ buttonText, onClickFunc, theme, size, css }) => {
  return (
    <Button onClick={onClickFunc} theme={theme} size={size} {...css}>
      {buttonText}
    </Button>
  );
};

const OutlineButtonComp = ({ buttonText, onClickFunc, theme, size, css }) => {
  return (
    <OutLineButton onClick={onClickFunc} theme={theme} size={size} {...css}>
      {buttonText}
    </OutLineButton>
  );
};

const Button = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  border: ${(props) => props.theme.mainColor} solid 1px;
  padding: ${(props) => props.size.padding};
  height: ${(props) => props.size.height};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 17px;
  ${(css) => css};

  &:hover {
    background: ${(props) => props.theme.color1};
    cursor: pointer;
  }

  &:disabled {
    color: ${color.ThemeGray1};
    background: ${color.ThemeGray2};
    border: none !important;
    transform: none;
    cursor: default;
  }
`;

const OutLineButton = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.mainColor};
  border: ${(props) => props.theme.mainColor} solid 1px;
  padding: ${(props) => props.size.padding};
  height: ${(props) => props.size.height};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 17px;
  ${(css) => css};

  &:hover {
    background: ${(props) => props.theme.color2};
    cursor: pointer;
  }

  &:disabled {
    color: ${color.ThemeGray1};
    background: ${color.ThemeGray2};
    border: none !important;
    transform: none;
    cursor: default;
  }
`;
