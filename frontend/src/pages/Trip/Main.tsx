import { Box } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '60%',
      md: '65%',
    },
    borderRadius: '10px',
    border: '1px solid #19252E',
    minHeight: '10rem',
    padding: '1%',
  },
};

const Main: FC<TripInfoProps> = ({ trip }) => {
  return <Box sx={style.main}>{trip.start_date}</Box>;
};

export default Main;
