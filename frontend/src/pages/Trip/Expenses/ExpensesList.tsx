import { Box, Pagination } from '@mui/material';
import ExpenseCard from './ExpenseCard';
import { Expense } from './Expenses';
import { useState, useEffect } from 'react';

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const [page, setPage] = useState(1);
  const [curr, setCurr] = useState<Expense[]>([]);

  useEffect(() => {
    const start = (page - 1) * 4;
    const end = start + 4;
    const next: Expense[] = [];
    for (let i = start; i < Math.min(end, expenses.length); i++) {
      next.push(expenses[i]);
    }
    setCurr(next);
  }, [expenses, page]);

  const handleChange = (page: number) => {
    setPage(page);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {curr.map((expense) => (
          <ExpenseCard key={`expense-${expense.id}`} expense={expense} />
        ))}
      </Box>
      <Box sx={{flexGrow: 1}}></Box>
      <Pagination
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
          },
        }}
        count={Math.ceil(expenses.length / 4)}
        color="primary"
        onChange={(_, page) => handleChange(page)}
      />
    </Box>
  );
};

export default ExpensesList;
