import { Box, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import CountrySelect from '../../components/CountrySelect';
import SimpleDatePicker from '../../components/DatePicker';

interface Props {
  handleChangeTripName: (name: string) => void;
  handleChangeCountry: (country: string) => void;
  handleChangeDate: (date: string) => void;
}

const Form: FC<Props> = ({
  handleChangeTripName,
  handleChangeCountry,
  handleChangeDate,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <Typography variant="h4" component="h4" fontSize="1rem">
        What is your trip called?
      </Typography>
      <TextField
        size="small"
        sx={{ mb: 1.5 }}
        onChange={(e) => handleChangeTripName(e.target.value)}
      />
      <Typography variant="h4" component="h4" fontSize="1rem">
        What is your destination?
      </Typography>
      <CountrySelect handleChangeCountry={handleChangeCountry} />
      {/* <LocationSelect /> */}
      <Typography variant="h4" component="h4" fontSize="1rem">
        When is your trip starting?
      </Typography>
      <SimpleDatePicker onChange={handleChangeDate} />
    </Box>
  );
};

export default Form;
