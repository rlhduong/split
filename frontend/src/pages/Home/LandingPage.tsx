import Header from '../../components/Header';
import Hero from './Hero';
import Form from './Form';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pageStyle } from '../../const/style';
import useOpenForm from '../../hooks/useOpenForm';

const LandingPage = () => {
  const {openForm, handleOpenForm, handleCloseForm} = useOpenForm();
  const [signIn, setSignIn] = useState(true);

  const status = useSelector((state: any) => state.status);
  if (status.loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  const openModal = (type: boolean) => {
    setSignIn(type);
    handleOpenForm();
  };

  return (
    <Box sx={pageStyle}>
      <Header handleOpen={openModal} />
      <Hero />
      <Form open={openForm} type={signIn} handleClose={handleCloseForm} />
    </Box>
  );
};

export default LandingPage;
