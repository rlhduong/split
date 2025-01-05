import Header from '../../components/Header';
import Hero from './Hero';
import Form from './Form';
import { Box } from '@mui/material';
import { useState } from 'react';

const s1 = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#FDFAF0',
  flexDirection: 'column',
};

const LandingPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const openModal = (type: boolean) => {
    setSignIn(type);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <Box sx={s1}>
      <Header handleOpen={openModal}/>
      <Hero />
      <Form open={openForm} type={signIn} handleClose={handleClose}/>
    </Box>
  );
};

export default LandingPage;
