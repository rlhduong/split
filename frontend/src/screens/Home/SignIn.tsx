import { TextField, Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { RequestHelper } from '../../utilities/helper';

const request = new RequestHelper();

interface SignProps {
  handleOpenAlert: (message: string) => void;
}
interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

const SignIn: FC<SignProps> = ({ handleOpenAlert }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await request.post('/admin/auth/login', { username, password });

    if (res.status !== 200) {
      handleOpenAlert('Invalid username or password');
      return;
    }
  };

  const handleKeyDown = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
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
      />
      <Button
        color="primary"
        variant="contained"
        size="medium"
        sx={{ marginTop: '2rem' }}
        onClick={() => login()}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
