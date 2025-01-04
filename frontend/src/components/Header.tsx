import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const s1 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const Header = () => {
  return (
    <header>
      <AppBar position="static">
        <Box sx={s1}>
          <Toolbar sx={{ width: '75%' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Split
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </Box>
      </AppBar>
    </header>
  );
};

export default Header;
