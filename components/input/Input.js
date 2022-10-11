import styled from '@emotion/styled';
import * as color from '@utils/constants/themeColor';

const Input = ({ type, value, onChange, onInput, attr, css }) => {
  console.log('input :' + JSON.stringify({ ...css }));
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
};

const InputCSS = styled.input`
  max-width: 100%;
  color: black;
  border: 1px solid ${color.ThemeGray1};
  font-size: 12px;
  padding: 1% 2%;
  margin-top: 5px;
  margin-bottom: 25px;
  ${(props) => props.css};
`;

export default Input;
