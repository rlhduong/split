import Header from '../../components/Header';
import Hero from './Hero';
import { Box } from '@mui/material';

const s1 = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#FDFAF0',
  flexDirection: 'column',
};

const LandingPage = () => {
  return (
    <Box sx={s1}>
      <Header />
      <Hero />
    </Box>
  );
};

export default LandingPage;
