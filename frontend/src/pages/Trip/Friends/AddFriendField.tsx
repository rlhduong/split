import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useAlert from '../../../hooks/useAlert';

interface AddFriendFieldProps {
  reload: () => void;
}

const AddFriendField: FC<AddFriendFieldProps> = ({ reload }) => {
  const { openAlert, error, handleOpenAlert, handleCloseAlert } = useAlert();
  const [name, setName] = useState('');
  const handleClick = () => {
    if (name === '') {
      handleOpenAlert('Please enter a friend name');
      return;
    }

    reload();
  };

  return (
    <Box sx={{ mt: '1rem', paddingLeft: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          color="secondary"
          focused
          onChange={(e) => setName(e.target.value)}
          size="small"
          fullWidth={false}
          sx={{ flexGrow: 1, color: 'white', input: { color: '#E4EEF6' } }}
        />
        <Button onClick={handleClick} sx={{ width: '10%' }}>
          <AddIcon />
        </Button>
      </Box>
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddFriendField;
