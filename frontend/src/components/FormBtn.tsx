import { Button } from '@mui/material';

interface FormBtnProps {
  text: string;
  onClick: () => void;
}

const FormBtn = ({ text, onClick }: FormBtnProps) => {
  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      sx={{ marginTop: '2rem', textTransform: 'none' }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default FormBtn;
