import { Box } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';
import Settle from './Transaction/Settle';
import Expense from './Expenses/Expenses';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '60%',
      md: '65%',
    },
    display: 'flex',
    flexDirection: 'column',
  },
};

const Main: FC<TripInfoProps> = ({ trip, reload }) => {
  return (
    <Box sx={style.main}>
      <Settle tripId={trip.id} />
      <Expense trip={trip} reload={reload}/>
    </Box>
  );
};

export default Main;
