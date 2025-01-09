import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';

interface NewExpenseBtnProps {
  handleOpen: () => void;
}

const NewExpenseBtn: FC<NewExpenseBtnProps> = ({ handleOpen }) => {
  return (
    <Button variant="outlined" color="accent" onClick={handleOpen}>
      <AddIcon />
    </Button>
  );
};

export default NewExpenseBtn;
