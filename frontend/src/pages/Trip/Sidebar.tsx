import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';


const style = {
  main: {
    width: '28%',
    borderRadius: '10px',
    border: '1px solid #19252E',
    padding: '2%',
  },
  stat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2% 5%',
    borderRadius: '10px',
  },
  hover: {
    transition: 'background-color 0.3s ease, transform 0.4s ease',
    '&:hover': {
      backgroundColor: '#19252E',
    },
  }
};

const SideBar: FC<TripInfoProps> = ({trip}) => {
  return (
    <Box sx={style.main}>
      <Box sx={{...style.stat, ...style.hover}}>
        <Typography variant="h6">Spent</Typography>
        <Typography variant="h6">{trip.total}</Typography>
      </Box>
    </Box>
  );
};

export default SideBar;
