import { Box } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';


const style = {
  main: {
    width: '65%',
    borderRadius: '10px',
    border: '1px solid #19252E',
  },
};

const Main: FC<TripInfoProps> = ({trip}) => {
  return <Box sx={style.main}>{trip.start_date}</Box>;
};

export default Main;
