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
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomLeftRadius: { xs: '10px', sm: '0' },
    borderBottomRightRadius: { xs: '10px', sm: '0' },
    border: '2px solid rgb(24, 53, 83)',
    padding: '1%',
    borderSizing: 'border-box',
    mb: {
      xs: '2rem',
      sm: '0',
    },
    borderBottom: { sm: 'none' },
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
      <Spent total={trip.total.toFixed(2)} />
      <FriendList friends={trip.friends} />
      <AddFriendField reload={reload} tripId={trip.id} />
    </Box>
  );
};

interface SpentProps {
  total: string;
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
