import {
  Typography,
  TextField,
  Box,
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { FC, useState } from 'react';
import { RequestHelper } from '../../utilities/helper';

const request = new RequestHelper();

interface FormProps {
  open: boolean;
  type: boolean;
  handleClose: () => void;
}

interface KeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

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
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          {type ? <SignIn /> : <SignUp />}
        </Box>
      </Fade>
    </Modal>
  );
};

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await request.post('/admin/auth/login', { username, password});
    console.log(res.data);
    console.log(res.status);
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

export default Form;
