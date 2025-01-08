import Header from '../../components/Header';
import CreateTripBtn from './CreateTripBtn';
import NewTripModal from './NewTripModal';
import TripList from './TripList';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { pageStyle } from '../../const/style';
import useOpenForm from '../../hooks/useOpenForm';
import useTrips from '../../hooks/useTrips';

const s2 = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  pt: '2rem',
};

const Dashboard = () => {
  const status = useSelector((state: any) => state.status);
  const { openForm, handleOpenForm, handleCloseForm } = useOpenForm();
  const { trips, loadTrips } = useTrips();

  useEffect(() => {
    const aaa = () => {
      if (!status.loggedIn) {
        return <Navigate to="/" />;
      } else {
        loadTrips();
      }
    };

    aaa();
  }, [status]);

  return (
    <Box sx={pageStyle}>
      <Header handleOpen={() => {}} />
      <Box sx={s2}>
        <CreateTripBtn handleOpenForm={handleOpenForm} />
        <NewTripModal
          open={openForm}
          handleClose={handleCloseForm}
          loadTrips={loadTrips}
        />
        <TripList trips={trips}/>
      </Box>
    </Box>
  );
};

export default Dashboard;
