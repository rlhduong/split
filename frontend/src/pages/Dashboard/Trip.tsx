import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

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
  tripName: string;
  destination: string;
  startDate: string;
}

const Trip: FC<TripProps> = ({ tripName, destination, startDate }) => {
  return (
    <Card sx={s1}>
      <CardMedia
        component="img"
        sx={{ width: '30%', aspectRatio: '1/1', padding: '5%' }}
        image="./src/assets/images/lol.JPG"
        alt="s"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {tripName}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: '#7C8288' }}
          >
            {destination}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {startDate}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
export default Trip;
