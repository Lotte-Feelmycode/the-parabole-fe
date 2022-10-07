import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

const OriginSize = { height: '55px', padding: '0.5em 1.5em 0.5em 1.5em' };
const SmallSize = { height: '30px', padding: '0 0.5em' };

const BlueTheme = color.BlueTheme;
const PinkTheme = color.PinkTheme;
const whiteTheme = color.whiteTheme;

export const Blue = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const SmallBlue = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = BlueTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const LineBlue = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = BlueTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const Pink = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const SmallPink = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = PinkTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const LinePink = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = PinkTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const White = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const SmallWhite = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <ButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const SmallLineWhite = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = whiteTheme;
  const size = SmallSize;
  return (
    <OutlineButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

export const LineWhite = ({
  id,
  name,
  buttonText,
  onClickFunc,
  width,
  disabled,
}) => {
  const theme = whiteTheme;
  const size = OriginSize;
  return (
    <OutlineButtonComp
      id={id}
      name={name}
      buttonText={buttonText}
      onClickFunc={onClickFunc}
      width={width}
      theme={theme}
      size={size}
      disabled={disabled}
    />
  );
};

const ButtonComp = ({
  id,
  name,
  buttonText,
  onClickFunc,
  theme,
  size,
  width,
  disabled,
}) => {
  return (
    <Button
      id={id}
      name={name}
      onClick={onClickFunc}
      theme={theme}
      size={size}
      width={width}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

const OutlineButtonComp = ({
  id,
  name,
  buttonText,
  onClickFunc,
  theme,
  size,
  width,
  disabled,
}) => {
  return (
    <OutLineButton
      id={id}
      name={name}
      onClick={onClickFunc}
      theme={theme}
      size={size}
      width={width}
      disabled={disabled}
    >
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
  width: ${(props) => props.width};
  focus: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0 3px;
  font-size: 17px;

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
  width: ${(props) => props.width};
  focus: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0 3px;
  font-size: 17px;

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
