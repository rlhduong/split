import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../store/loggedin';
import { useNavigate } from 'react-router-dom';
import { request } from '../utilities/helper';

interface FormProps {
  handleOpen: (type: boolean) => void;
}

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const Header: FC<FormProps> = ({ handleOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.status);

  const logout = async () => {
    const res = await request.post('/admin/auth/logout');
    if (res.status === 200) {
      dispatch(setLogout());
      navigate('/');
    }
  };

  return (
    <header>
      <AppBar position="static" color="primary">
        <Box sx={s1}>
          <Toolbar sx={{ width: '75%', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              Split
            </Typography>
            {status.loggedIn ? (
              <Button
                color="inherit"
                sx={{ textTransform: ' none' }}
                onClick={logout}
              >
                Log out
              </Button>
            ) : (
              <>
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
                    <Typography color="black">Sign up</Typography>
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </header>
  );
};

export default Header;
