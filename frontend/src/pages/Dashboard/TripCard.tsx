import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleTrip } from '../../utilities/interface';

const s1 = {
  width: { xs: '100%', sm: '45%', lg: '30%' },
  aspectRatio: '5/2',
  borderRadius: '10px',
  border: '1.5px solid #1E2E3F',
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  transition: 'background-color 0.3s ease, transform 0.4s ease',
  color: '#E4EEF6',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

interface TripProps {
  trip: SimpleTrip;
}

const Trip: FC<TripProps> = ({ trip }) => {
  const navigate = useNavigate();
  return (
    <Card sx={s1} onClick={() => navigate(`/trip/${trip.id}`)}>
      <CardMedia
        component="img"
        sx={{ width: '30%', aspectRatio: '1/1', padding: '5%' }}
        image="./src/assets/images/lol.png"
        alt="s"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', paddingLeft: 0 }}>
          <Typography component="div" variant="h6">
            {trip.trip_name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: '#7C8288' }}
          >
            {trip.destination}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {trip.start_date}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
export default Trip;
