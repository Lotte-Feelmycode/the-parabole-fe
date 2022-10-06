import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import styled from '@emotion/styled';
import { containerClasses } from '@mui/material';

const BasicDateTimePicker = ({
  className,
  inputLabel,
  initDateTime,
  inputFormat,
  inputMask,
  inputWidth,
}) => {
  const [dateWithInitialValue, setDateWithInitialValue] = useState(
    dayjs(initDateTime ? initDateTime : new Date()),
  );

  const format = inputFormat ? inputFormat : 'YYYY/MM/DD hh:mm a';
  const mask = inputMask ? inputMask : '____/__/__ __:__ _M';
  const width = inputWidth ? inputWidth : '50%';

  return (
    <Div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={inputLabel}
          inputFormat={format}
          mask={mask}
          value={dateWithInitialValue}
          onChange={(newValue) => {
            setDateWithInitialValue(newValue);
          }}
        />
      </LocalizationProvider>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  margin-bottom: 20px;
  max-width: ${(props) => props.width};
`;

export default BasicDateTimePicker;
