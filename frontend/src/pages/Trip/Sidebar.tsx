import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';
import FriendList from './Friends/FriendList';
import AddFriendField from './Friends/AddFriendField';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '33%',
      md: '28%',
    },
    borderRadius: '10px',
    border: '2px solid #0c4c92',
    padding: '1%',
    borderSizing: 'border-box',
    mb: {
      xs: '2rem',
      sm: '0',
    },
    borderBottom: {sm: 'none'}
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
      md: '1.5rem',
    },
    boxSizing: 'border-box',
  },
  hover: {
    transition: 'background-color 0.3s ease, transform 0.4s ease',
    '&:hover': {
      backgroundColor: '#19252E',
    },
  },
};

const SideBar: FC<TripInfoProps> = ({ trip, reload }) => {
  return (
    <Box sx={style.main}>
      <Spent total={trip.total} />
      <FriendList friends={trip.friends} />
      <AddFriendField reload={reload} tripId={trip.id} />
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
