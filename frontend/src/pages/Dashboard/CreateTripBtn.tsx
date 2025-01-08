import { Container, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FC } from 'react';

interface CreateProps {
  handleOpenForm: () => void;
}

const s1 = {
  borderRadius: '14px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: { xs: '60%', sm: '40%', md: '45%', xl: '30%' },
  height: '30%',
  justifyContent: 'center',
  backgroundColor: '#1E2E3F',
  transition: 'background-color 0.3s ease, transform 0.4s ease',
  '&:hover': {
    backgroundColor: '#111920',
    transform: 'scale(1.05)',
  },
  cursor: 'pointer',
};

const s2 = {
  fontSize: { xs: '0.9rem', sm: '1rem', md: '2rem', lg: '2.5rem', xl: '2.5rem' },
  padding: '20px 40px 20px 40px',
  color: 'white',
  borderRadius: '15px',
};

const CreateTripBtn: FC<CreateProps> = ({ handleOpenForm }) => {
  return (
    <Container
      sx={s1}
      id="create-presentation-btn"
      onClick={() => handleOpenForm()}
    >
      <Typography sx={s2} variant="h1">
        New Presentation
      </Typography>
      <AddCircleOutlineIcon
        sx={{
          color: 'white',
          fontSize: {
            xs: '16px',
            sm: '16px',
            md: '2rem',
            lg: '3rem',
            xl: '3rem',
          },
        }}
      ></AddCircleOutlineIcon>
    </Container>
  );
};

export default CreateTripBtn;
