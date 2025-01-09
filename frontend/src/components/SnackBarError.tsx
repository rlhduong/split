import { Snackbar, Alert } from '@mui/material';

interface SnackbarErrorProps {
  openAlert: boolean;
  error: string;
  handleCloseAlert: () => void;
}

const SnackbarError = ({
  openAlert,
  error,
  handleCloseAlert,
}: SnackbarErrorProps) => {
  return (
    <Snackbar
      open={openAlert}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
export default SnackbarError;
