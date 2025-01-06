import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';

interface FormProps {
  open: boolean;
  message: string;
  handleClose: () => void;
}

const ErrorAlert: FC<FormProps> = ({ open, message, handleClose }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close-error-alert"
              color="inherit"
              size="small"
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 5 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ErrorAlert;
