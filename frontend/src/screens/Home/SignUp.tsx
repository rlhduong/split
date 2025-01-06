import { TextField, Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { RequestHelper } from '../../utilities/helper';

const request = new RequestHelper();

interface SignProps {
  handleOpenAlert: (message: string) => void;
}

interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

const SignUp: FC<SignProps> = ({ handleOpenAlert }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      username === '' ||
      password === ''
    ) {
      handleOpenAlert('Please fill in all fields');
      return;
    }

    const res = await request.post('/admin/auth/register', {
      firstName,
      lastName,
      username,
      password,
    });

    if (res.status !== 200) {
      handleOpenAlert(res.data.error);
      return;
    }
  };

  const handleKeyDown = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="First Name"
        variant="standard"
        margin="normal"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        name="signup-firstname"
      />
      <TextField
        label="Last Name"
        variant="standard"
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        name="signup-lastname"
      />
      <TextField
        label="Username"
        variant="standard"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        name="login-email"
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
        onClick={() => register()}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SignUp;
