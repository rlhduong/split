import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';
import FriendList from './Friends/FriendList';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '33%',
      md: '28%',
    },
    borderRadius: '10px',
    border: '1px solid #19252E',
    padding: '1%',
    borderSizing: 'border-box',
    mb: {
      xs: '2rem',
    },
  },
  stat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2% 5%',
    borderRadius: '10px',
    mb: {
      xs: '0rem',
      sm: '1rem',
      md: '2rem',
    },
    borderSizing: 'border-box',
  },
  hover: {
    transition: 'background-color 0.3s ease, transform 0.4s ease',
    '&:hover': {
      backgroundColor: '#19252E',
    },
  },
};

const data = {
  roger: {
    total: 200,
    net: 0,
  },
  rachel: {
    total: 100,
    net: 0,
  },
};

const SideBar: FC<TripInfoProps> = ({ trip }) => {
  return (
    <Box sx={style.main}>
      <Spent total={trip.total} />
      <FriendList friends={data} />
    </Box>
  );
};

interface SpentProps {
  total: number;
}

const Spent: FC<SpentProps> = ({ total }) => {
  return (
    <Box sx={{ ...style.stat, ...style.hover }}>
      <Typography variant="h6">Spent</Typography>
      <Typography variant="h6">{total}</Typography>
    </Box>
  );
};

export default SideBar;
