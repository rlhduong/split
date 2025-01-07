import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns/format';
import { FC } from 'react';

interface Props {
  onChange: (date: string) => void;
}

const SimpleDatePicker: FC<Props> = ({ onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={(newValue) =>
          onChange(format(newValue || Date.now(), 'dd/MM/yyyy'))
        }
        format="dd/MM/yyyy"
        sx={{ mb: 1.5 }}
      />
    </LocalizationProvider>
  );
};

export default SimpleDatePicker;
