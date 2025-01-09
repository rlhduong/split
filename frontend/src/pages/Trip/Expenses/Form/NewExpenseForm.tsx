import { FC } from 'react';
import { Typography, Box, Modal, Fade, Backdrop } from '@mui/material';
import { formStyle } from '../../../../const/style';
import { useState } from 'react';
import ExpenseFormTop from './ExpenseFormTop';
import ExpenseFormMid from './ExpenseFormMid';
import ExpenseFormBtm from './ExpenseFormBtm';

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
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState<Array<string>>([]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            ...formStyle,
            width: { xs: '75%', sm: '50%', md: '35%', lg: '22%' },
          }}
        >
          <Typography variant="h5" component="h5" mb="2rem">
            Create a new expense
          </Typography>
          <ExpenseFormTop
            payer={payer}
            setPayer={setPayer}
            amount={amount}
            setAmount={setAmount}
            friends={friends}
          />
          <ExpenseFormMid
            description={description}
            setDescription={setDescription}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewExpenseForm;
