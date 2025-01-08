import { Container } from '@mui/material';

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '2rem',
  animation: 'fadeIn 0.7s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  backgroundColor: 'red',
  width: '70%',
};

const TripList = () => {
  return <Container sx={s1}></Container>;
};

export default TripList;
