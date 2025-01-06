import { Container, Typography, } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const s1 = {
  borderRadius: '14px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: {xs: '70%', sm: '50%', md: '40%'},
  height: '30%',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  transition: 'background-color 0.3s ease, transform 0.4s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    transform: 'scale(1.05)',
  },
}

const s2 = { fontSize: { xs: '16px', sm: '16px', md: '2rem', lg: '3rem', xl: '3rem' }, padding: '20px 40px 20px 40px', color: 'white', borderRadius: '15px', cursor: 'pointer' }


const CreateTripBtn = () => {

	return (      <Container sx={s1} id="create-presentation-btn">
		<Typography sx={s2} variant='h1'>New Presentation</Typography>
		<AddCircleOutlineIcon sx={{color: 'white', fontSize: { xs: '16px', sm: '16px', md: '2rem', lg: '3rem', xl: '3rem' }}}></AddCircleOutlineIcon>
	</Container>
)
  
}

export default CreateTripBtn;