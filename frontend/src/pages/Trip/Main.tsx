import { Box } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';
import Settle from './Settle';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '60%',
      md: '65%',
    },
  },
};

const Main: FC<TripInfoProps> = ({ trip }) => {
  return (
    <Box sx={style.main}>
      <Settle tripId={trip.id} />
    </Box>
  );
};

export default Main;
