import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { FC } from 'react';

interface FormProps {
  handleOpen: (type: boolean) => void;
}

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const Header: FC<FormProps> = ({ handleOpen }) => {
  return (
    <header>
      <AppBar position="static" color="primary">
        <Box sx={s1}>
          <Toolbar sx={{ width: '75%', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              Split
            </Typography>
            <Box>
              <Button color="inherit" sx={{ textTransform: ' none' }}>
                Home
              </Button>
              <Button color="inherit" sx={{ textTransform: ' none' }}>
                About
              </Button>
              <Button color="inherit" sx={{ textTransform: ' none' }}>
                Contact
              </Button>
            </Box>
            <Box>
              <Button
                color="secondary"
                sx={{ textTransform: ' none', marginRight: '1rem' }}
                onClick={() => handleOpen(true)}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ textTransform: ' none' }}
                onClick={() => handleOpen(false)}
              >
                <Typography>Sign up</Typography>
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </header>
  );
};

export default Header;
