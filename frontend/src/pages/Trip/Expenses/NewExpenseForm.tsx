import { FC } from 'react';
import { Select, Typography, Box, Modal, Fade, Backdrop } from '@mui/material';
import { formStyle } from '../../../const/style';

const tripExpenses = [
  'Flights',
  'Accommodation',
  'Food & Drinks',
  'Transportation (Local)',
  'Activities & Tours',
  'Travel Insurance',
  'Souvenirs',
  'Entertainment',
  'Emergency Expenses',
  'Miscellaneous',
];

const pp = ['roger', 'john', 'paul', 'george'];

interface NewExpenseFormProps {
  tripId: number;
  handleClose: () => void;
  open: boolean;
  friends: Array<string>;
}

const NewExpenseForm: FC<NewExpenseFormProps> = ({
  friends,
  tripId,
  handleClose,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-dialog"
      aria-describedby="sign-in-or-sign-up"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...formStyle, width: { xs: '75%', sm: '40%', md: '30%' } }}>
          <Typography variant="h5" component="h5">
            Create a new expense
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewExpenseForm;
