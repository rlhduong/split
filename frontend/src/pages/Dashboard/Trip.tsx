import { Box } from '@mui/material';

const s1 = {
  width: { xs: '100%', sm: '45%', lg: '30%' },
	aspectRatio: '2/1',
  backgroundColor: '#0069d1',
};

const Trip = () => {
  return <Box sx={s1}></Box>;
};

export default Trip;
