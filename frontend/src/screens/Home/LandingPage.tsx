import Header from '../../components/Header';
import Hero from './Hero';
import Form from './Form';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const s1 = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#FDFAF0',
  flexDirection: 'column',
};

const LandingPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const status = useSelector((state: any) => state.status);
  if (status.loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  const openModal = (type: boolean) => {
    setSignIn(type);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <Box sx={s1}>
      <Header handleOpen={openModal} />
      <Hero />
      <Form open={openForm} type={signIn} handleClose={handleClose} />
    </Box>
  );
};

export default LandingPage;
