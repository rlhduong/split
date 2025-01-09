import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NewExpenseBtn = () => {
  return (
    <Button variant="outlined" color="accent">
      <AddIcon />
    </Button>
  );
};

export default NewExpenseBtn;
