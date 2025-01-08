import { Container } from '@mui/material';
import { FC } from 'react';
import { SimpleTrip } from '../../utilities/interface';
import Trip from './TripCard';

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '2.5rem',
  animation: 'fadeIn 0.7s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  mt: { xs: '3rem', sm: '4rem', md: '5rem' },
  mb: '5rem',
  width: '75%',
};

interface TripListProps {
  trips: SimpleTrip[];
}

const TripList: FC<TripListProps> = ({ trips }) => {
  return (
    <Container sx={s1}>
      {trips.map((trip: SimpleTrip) => (
        <Trip
          key={`tripId=${trip.id}`}
          trip={trip}
        />
      ))}
    </Container>
  );
};

export default TripList;
