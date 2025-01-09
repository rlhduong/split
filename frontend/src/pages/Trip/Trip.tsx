import { Box, Button, Typography } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { request } from '../../utilities/helper';
import { TripInfo } from '../../utilities/interface';
import { TripOverView as styles } from '../../const/style';
import SideBar from './Sidebar';
import Main from './Main';

const Trip = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState<TripInfo>({
    id: 0,
    trip_name: '',
    destination: '',
    start_date: '',
    friends: {},
    total: 0,
  });

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    const res = await request.get(`/trips/${tripId}`);
    if (res.status !== 200) {
      navigate('/dashboard', { replace: true });
      return;
    }
    setTrip(res.data);
  };

  return (
    <Box sx={styles.main}>
      <Box sx={styles.top}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            marginRight: '5%',
          }}
        >
          {trip.trip_name}
        </Typography>
        <Typography variant="h6" color="#e4eef6">
          {trip.destination}
        </Typography>
        <Button sx={styles.btn} color="secondary">
          <SettingsSharpIcon />
        </Button>
      </Box>
      <Box sx={styles.bot}>
        <SideBar trip={trip} reload={reload} />
        <Main trip={trip} reload={reload} />
      </Box>
    </Box>
  );
};

export default Trip;
