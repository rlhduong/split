import Header from '../../components/Header';
import { Box } from '@mui/material';

const s1 = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#FDFAF0',
  flexDirection: 'column',
};
const Dashboard = () => {
  return (
    <Box sx={s1}>
      <Header handleOpen={() => {}} />
      <h1>Dashboard</h1>
    </Box>
  );
};

export default Dashboard;
