import { Box, Modal, Fade, Backdrop, Typography, Button } from '@mui/material';
import { FC, useState } from 'react';
import ErrorAlert from '../../components/ErrorAlert';
import useAlert from '../../hooks/useAlert';
import Form from './Form';
import { request } from '../../utilities/helper';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '50%', lg: '40%' },
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '1rem',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
};

interface FormProps {
  open: boolean;
  handleClose: () => void;
  loadTrips: () => void;
}

const NewTripModal: FC<FormProps> = ({ open, handleClose, loadTrips }) => {
  const { openAlert, error, handleOpenAlert, handleCloseAlert } = useAlert();
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const reset = () => {
    handleClose();
    handleCloseAlert();
  };

  const handleCreate = async () => {
    if (destination === '' || date === '' || tripName === '') {
      handleOpenAlert('Please fill in all fields');
      return;
    }

    const res = await request.post('/trips', {
      tripName,
      destination,
      startDate: date,
      budget: 0,
    });

    if (res.status !== 200) {
      handleOpenAlert('Failed to create trip');
      return;
    }

    loadTrips();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={() => reset()}
      aria-labelledby="create-trip-dialog"
      aria-describedby="create-a-new-trip"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            variant="h2"
            component="h2"
            fontSize="1.5rem"
            mb="1rem"
            fontWeight="400"
          >
            Start a new trip
          </Typography>
          <Form
            handleChangeTripName={setTripName}
            handleChangeCountry={setDestination}
            handleChangeDate={setDate}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button
              size="medium"
              variant="contained"
              sx={{ width: '30%', textTransform: 'none' }}
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
          <ErrorAlert
            open={openAlert}
            message={error}
            handleClose={handleCloseAlert}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTripModal;
