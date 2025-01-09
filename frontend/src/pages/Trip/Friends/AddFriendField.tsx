import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useAlert from '../../../hooks/useAlert';
import { request } from '../../../utilities/helper';

interface AddFriendFieldProps {
  reload: () => void;
  tripId: number;
}

const AddFriendField: FC<AddFriendFieldProps> = ({ reload, tripId }) => {
  const { openAlert, error, handleOpenAlert, handleCloseAlert } = useAlert();
  const [name, setName] = useState('');
  const handleClick = async () => {
    if (name === '') {
      handleOpenAlert('Please enter a friend name');
      return;
    }

    const res = await request.post(`/trips/${tripId}/friends`, {
      friend: name,
    });

    if (res.status === 400) {
      handleOpenAlert(res.data.error);
    }

    setName('');
    reload();
  };

  return (
    <Box sx={{ mt: '1rem', paddingLeft: '0.5rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          value={name}
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
