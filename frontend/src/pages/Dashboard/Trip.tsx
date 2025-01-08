import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const s1 = {
  width: { xs: '100%', sm: '45%', lg: '30%' },
  aspectRatio: '2/1',
  borderRadius: '10px',
  border: '1.5px solid #1E2E3F',
  display: 'flex',
  flexDirection: 'row',
  padding: { xs: '6%', sm: '2.5%', md: '2%' },
  paddingLeft: { xs: '6%', sm: '1%', md: '1%' },
  boxSizing: 'border-box',
  transition: 'background-color 0.3s ease, transform 0.4s ease',
  color: '#E4EEF6',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  cursor: 'pointer',
};

const s2 = {
  height: '100%',
  aspectRatio: '1/1',
};

interface TripProps {
  tripName: string;
  destination: string;
  startDate: string;
}

const Trip: FC<TripProps> = ({ tripName, destination, startDate }) => {
  return (
    <Box sx={s1}>
      <Box sx={s2}></Box>
      <Box sx={{ ...s2, padding: '0 0 0 3%' }}>
        <Typography
          variant="h4"
          fontSize={{ xs: '1.3rem', sm: '1.2rem', md: '1.8rem' }}
          mb="0.5rem"
        >
          {tripName}
        </Typography>
        <Typography
          variant="body1"
          fontSize={{ xs: '0.9rem', sm: '0.8rem', md: '1rem' }}
          mb="0.5rem"
          color="#7C8288"
        >
          {destination}
        </Typography>
        <Typography
          variant="body1"
          fontSize={{ xs: '1rem', sm: '0.9rem', md: '1.1rem' }}
          mb="0.5rem"
        >
          {startDate}
        </Typography>
      </Box>
    </Box>
  );
};

export default Trip;
