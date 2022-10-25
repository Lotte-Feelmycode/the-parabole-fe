import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

const OriginSize = { height: '55px', padding: '0.5em 1.5em 0.5em 1.5em' };
const SmallSize = { height: '30px', padding: '0 0.5em' };

const BlueTheme = color.BlueTheme;
const PinkTheme = color.PinkTheme;
const whiteTheme = color.WhiteTheme;

export const Blue = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallBlue = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = BlueTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const LineBlue = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallLineBlue = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = BlueTheme;
  const size = SmallSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const Pink = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallPink = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = PinkTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const LinePink = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallLinePink = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = PinkTheme;
  const size = SmallSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const White = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallWhite = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const SmallLineWhite = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

export const LineWhite = ({ buttonText, onClickFunc, attr, css }) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      theme={theme}
      size={size}
      attr={attr}
      css={css}
    />
  );
};

const ButtonComp = ({ buttonText, onClickFunc, theme, size, attr, css }) => {
  return (
    <ButtonStyled
      onClick={onClickFunc}
      theme={theme}
      size={size}
      {...attr}
      css={css}
    >
      {buttonText}
    </ButtonStyled>
  );
};

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

const ButtonStyled = styled.button`
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  border: ${(props) => props.theme.mainColor} solid 1px;
  padding: ${(props) => props.size.padding};
  height: ${(props) => props.size.height};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 17px;
  ${(props) => props.css};

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

const OutLineButtonStyled = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.mainColor};
  border: ${(props) => props.theme.mainColor} solid 1px;
  padding: ${(props) => props.size.padding};
  height: ${(props) => props.size.height};
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
    background: ${color.ThemeGray2};
    border: none !important;
    transform: none;
    cursor: default;
  }
`;
