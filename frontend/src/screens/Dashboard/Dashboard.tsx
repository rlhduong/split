import Header from '../../components/Header';
import CreateTripBtn from './CreateTripBtn';
import { Box } from '@mui/material';

const s1 = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#FDFAF0',
  flexDirection: 'column',
};

const s2 = {
  display: 'flex',
  justifyContent: 'center',
  flexGrow: 1,
  width: '100%',
  pt: '2rem'
}

const Dashboard = () => {
  return (
    <Box sx={s1}>
      <Header handleOpen={() => {}} />
      <Box sx={s2}>
        <CreateTripBtn/>
      </Box>
    </Box>
  );
};

export default Dashboard;
