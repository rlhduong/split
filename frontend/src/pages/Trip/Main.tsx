import { Box } from '@mui/material';
import { FC } from 'react';
import { TripInfoProps } from '../../utilities/interface';
import useOpenForm from '../../hooks/useOpenForm';
import Settle from './Transaction/Settle';
import Expense from './Expenses/Expenses';
import NewExpenseForm from './Expenses/NewExpenseForm';
import SnackbarError from '../../components/SnackBarError';
import useAlert from '../../hooks/useAlert';

const style = {
  main: {
    width: {
      xs: '100%',
      sm: '60%',
      md: '65%',
    },
    display: 'flex',
    flexDirection: 'column',
  },
};

const Main: FC<TripInfoProps> = ({ trip, reload }) => {
  const { openForm, handleOpenForm, handleCloseForm } = useOpenForm();
  const { openAlert, handleOpenAlert, handleCloseAlert, error } = useAlert();

  const handleOpen = () => {
    if (Object.keys(trip.friends).length === 0) {
      handleOpenAlert('Please add friends to the trip first');
      return;
    }
    handleOpenForm();
  };

  return (
    <Box sx={style.main}>
      <Settle tripId={trip.id} />
      <Expense trip={trip} reload={reload} handleOpen={handleOpen} />
      <NewExpenseForm
        tripId={trip.id}
        handleClose={handleCloseForm}
        open={openForm}
        friends={Object.keys(trip.friends)}
      />
      <SnackbarError
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        error={error}
      />
    </Box>
  );
};

export default Main;
