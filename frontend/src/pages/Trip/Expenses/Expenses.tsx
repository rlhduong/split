import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { TripMain } from '../../../const/style';
import { TripInfoProps } from '../../../utilities/interface';
import { request } from '../../../utilities/helper';
import NewExpenseBtn from './NewExpenseBtn';

interface Expense {
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

const Expense: FC<ExpenseProps> = ({ trip, handleOpen }) => {
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
    <Box sx={{ ...TripMain, flexGrow: 1, borderBottom: { sm: 'none' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Expenses</Typography>
        <NewExpenseBtn handleOpen={handleOpen} />
      </Box>
      {expenses.length === 0 && (
        <Typography textAlign="center" mt="1.8rem">
          No expenses
        </Typography>
      )}
    </Box>
  );
};

export default Expense;
