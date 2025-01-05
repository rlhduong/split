import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const Header = () => {
  return (
    <header>
      <AppBar position="static" color="primary">
        <Box sx={s1}>
          <Toolbar sx={{ width: '75%' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Split
            </Typography>
            <Button color="inherit" sx={{ textTransform: ' none' }}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: ' none' }}>
              About
            </Button>
            <Button color="inherit" sx={{ textTransform: ' none' }}>
              Contact
            </Button>
          </Toolbar>
        </Box>
      </AppBar>
    </header>
  );
};

export default Header;
