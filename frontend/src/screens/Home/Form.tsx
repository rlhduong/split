import { Typography, Box, Modal, Fade, Backdrop } from '@mui/material';
import { FC, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ErrorAlert from './ErrorAlert';

interface FormProps {
  open: boolean;
  type: boolean;
  handleClose: () => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '300px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Form: FC<FormProps> = ({ open, type, handleClose }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState('');

  const handleOpenAlert = (message: string) => {
    setError(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setError('');
    setOpenAlert(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        handleCloseAlert();
      }}
      aria-labelledby="auth-dialog"
      aria-describedby="sign-in-or-sign-up"
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
            variant="h5"
            component="h5"
            textAlign={type ? 'left' : 'center'}
          >
            {type ? 'Welcome back 👋' : 'Sign up'}
          </Typography>
          {type ? (
            <SignIn handleOpenAlert={handleOpenAlert} />
          ) : (
            <SignUp handleOpenAlert={handleOpenAlert} />
          )}
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

export default Form;
