import { Box, Button, Typography } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import { pageStyle } from '../../const/style';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { request } from '../../utilities/helper';
import { TripInfo } from '../../utilities/interface';
import SideBar from './Sidebar';
import Main from './Main';

const styles = {
  main: {
    ...pageStyle,
    padding: {
      xs: '10% 13%',
      sm: '5% 10% 0 10%',
      md: '5% 16% 0 16%',
      lg: '5% 20% 0 20%',
    },
    boxSizing: 'border-box',
    color: '#E4EEF6',
  },
  top: {
    display: 'flex',
    alignItems: 'baseline',
  },
  bot: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: {
      xs: 'flex-start',
      sm: 'space-between',
    },
    flexGrow: 1,
    height: '100%',
  },
  btn: {
    ml: 'auto',
  },
};

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
    const a = async () => {
      const res = await request.get(`/trips/${tripId}`);

      if (res.status !== 200) {
        navigate('/dashboard', { replace: true });
        return;
      }

      setTrip(res.data);
    };

    a();
  }, []);


  const reload = async() => {
    const res = await request.get(`/trips/${tripId}`);
    setTrip(res.data);
  }

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
        <SideBar trip={trip} />
        <Main trip={trip} />
      </Box>
    </Box>
  );
};

export default Trip;
