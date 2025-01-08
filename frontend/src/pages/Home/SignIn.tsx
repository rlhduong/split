import { TextField, Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { request } from '../../utilities/helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/loggedin';

interface SignProps {
  handleOpenAlert: (message: string) => void;
  handleClose: () => void;
}
interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

const SignIn: FC<SignProps> = ({ handleOpenAlert, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (username === '' || password === '') {
      handleOpenAlert('Please fill in all fields');
      return;
    }

    const res = await request.post('/admin/auth/login', { username, password });
    if (res.status !== 200) {
      handleOpenAlert('Invalid username or password');
      return;
    }

    handleClose();
    dispatch(setLogin());
    navigate('/dashboard');
  };

  const handleKeyDown = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Username"
        variant="standard"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        name="login-username"
        color="primary"
      />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        name="login-password"
        color="primary"
      />
      <Button
        color="primary"
        variant="contained"
        size="medium"
        sx={{ marginTop: '2rem', textTransform: 'none' }}
        onClick={() => login()}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
