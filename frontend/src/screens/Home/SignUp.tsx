import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';



interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleKeyDown = (e: KeyDownEvent) => {
    if (e.key === 'Enter') {
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
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SignUp;
