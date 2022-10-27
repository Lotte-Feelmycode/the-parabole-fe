import styled from '@emotion/styled';
import { MainPink } from '@utils/constants/themeColor';

function Checkbox({ text, onChange }) {
  const switchChecked = (e) => {
    if (e.target.checked) {
      onChange && onChange(true);
    } else {
      onChange && onChange(false);
    }
  };

  return (
    <Label htmlFor={text}>
      <Input
        type="checkbox"
        id={text}
        name={text}
        onChange={switchChecked}
        defaultChecked={true}
      />
      <p className="ml-2.5">{text}</p>
    </Label>
  );
}

export default Checkbox;

const Input = styled.input`
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.2rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${MainPink};
  }

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;
