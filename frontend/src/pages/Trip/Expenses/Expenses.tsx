import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { TripMain } from '../../../const/style';
import { TripInfoProps } from '../../../utilities/interface';
import { request } from '../../../utilities/helper';
import NewExpenseBtn from './NewExpenseBtn';
import ExpensesList from './ExpensesList';

export interface Expense {
  id: number;
  trip_id: number;
  amount: number;
  description: string;
  payer: string;
  participants: Array<string>;
}

interface ExpenseProps extends TripInfoProps {
  handleOpen: () => void;
}

const Expenses: FC<ExpenseProps> = ({ trip, handleOpen, reload }) => {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  useEffect(() => {
    const fetchExpense = async () => {
      if (trip.id === 0) return;

      const res = await request.get(`/trips/${trip.id}/expenses`);
      setExpenses(res.data);
    };

    fetchExpense();
  }, [trip]);

  return (
    <Box
      sx={{
        ...TripMain,
        flexGrow: { sm: 1 },
        height: {xs: '370px'},
        borderBottom: { sm: 'none' },
        borderBottomLeftRadius: { sm: '0' },
        borderBottomRightRadius: { sm: '0' },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}
      >
        <Typography variant="h5">Expenses</Typography>
        <NewExpenseBtn handleOpen={handleOpen} />
      </Box>
      {expenses.length === 0 && (
        <Typography textAlign="center" mt="1.8rem">
          No expenses
        </Typography>
      )}
      <ExpensesList expenses={expenses} reload={reload} />
    </Box>
  );
};

export default Expenses;
