import Header from '../../components/Header';
import CreateTripBtn from './CreateTripBtn';
import NewTripModal from './NewTripModal';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { request } from '../../utilities/helper';
import useOpenForm from '../../hooks/useOpenForm';

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
  pt: '2rem',
};

const Dashboard = () => {
  const status = useSelector((state: any) => state.status);
  const { openForm, handleOpenForm, handleCloseForm } = useOpenForm();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const res = await request.get('/trips');
      if (res.status !== 200) {
        return;
      }
      setTrips(res.data);
    };
  
    const aaa = () => {
      if (!status.loggedIn) {
        return <Navigate to="/" />;
      } else {
        getTrips();
      }
    };

    aaa();
  }, [status]);



  return (
    <Box sx={s1}>
      <Header handleOpen={() => {}} />
      <Box sx={s2}>
        <CreateTripBtn handleOpenForm={handleOpenForm} />
        <NewTripModal open={openForm} handleClose={handleCloseForm} />
      </Box>
    </Box>
  );
};

export default Dashboard;
