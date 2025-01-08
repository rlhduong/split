import { Container } from '@mui/material';
import Trip from './Trip';

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '2.5rem',
  animation: 'fadeIn 0.7s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  mt: {xs: '3rem', sm: '5rem'},
  mb: '5rem',
  width: '75%',
};

const TripList = () => {
  return <Container sx={s1}>
    <Trip />
    <Trip />
    <Trip />
    <Trip />
  </Container>;
};

export default TripList;
