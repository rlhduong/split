import { Box, Container, Typography, Button } from '@mui/material';
const Hero = () => {
  return (
    <main>
      <Container
        sx={{ display: 'flex', flexDirection: 'row', marginTop: '6rem' }}
      >
        <Left />
        <Right />
      </Container>
    </main>
  );
};

const Left = () => {
  return <Box sx={{ width: '40%', height: '30%' }}>Yo</Box>;
};

const Right = () => {
  return (
    <Box sx={{ maxWidth: '520px' }}>
      <Typography
        variant="h1"
        component="h1"
        textAlign={{ xs: 'left', sm: 'left' }}
        fontSize={{ xs: '2.5rem', md: '4rem' }}
      >
        Sharing expenses
      </Typography>
      <Typography
        variant="h1"
        component="h1"
        textAlign={{ xs: 'left', sm: 'left' }}
        marginBottom={'1.5rem'}
        fontSize={{ xs: '2.5rem', md: '4rem' }}
      >
        made easier
      </Typography>
      <Typography
        variant="h4"
        component="div"
				fontSize={{ xs: '1.3rem', lg: '1.5rem' }}
				textAlign={{ xs: 'left', sm: 'left' }}
				marginBottom={'1.5rem'}
      >
        Keep track of your shared expenses and balances with housemates, trips,
        groups, friends, and family.
      </Typography>
      <Button color="primary" variant='contained'>Get Started</Button>
    </Box>
  );
};

export default Hero;
