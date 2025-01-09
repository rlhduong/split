import { Box, Button, TextField } from '@mui/material';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useAlert from '../../../hooks/useAlert';
import { request } from '../../../utilities/helper';
import SnackbarError from '../../../components/SnackBarError';

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
      <SnackbarError
        openAlert={openAlert}
        error={error}
        handleCloseAlert={handleCloseAlert}
      />
    </Box>
  );
};

export default AddFriendField;
