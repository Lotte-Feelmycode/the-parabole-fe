import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styled from '@emotion/styled';

const BasicDateTimePicker = ({
  className,
  value,
  onChange,
  inputLabel,
  inputFormat,
  inputMask,
}) => {
  const format = inputFormat ? inputFormat : 'YYYY/MM/DD hh:mm a';
  const mask = inputMask ? inputMask : '____/__/__ __:__ _m';

  return (
    <DateTimePicker
      renderInput={(props) => <TextField {...props} />}
      label={inputLabel}
      inputFormat={format}
      mask={mask}
      value={value}
      onChange={onChange}
    />
  );
};

export default BasicDateTimePicker;
