import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Chip,
} from '@mui/material';
import { cardStyle } from '../../../const/style';
import { Expense } from './Expenses';
import { useState } from 'react';

interface TransactionCardProps {
  expense: Expense;
}

const s = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const ExpenseCard = ({ expense }: TransactionCardProps) => {
  const [hover, useHover] = useState(false);

  return (
    <Card sx={cardStyle}>
      <CardActionArea
        onMouseEnter={() => useHover(true)}
        onMouseLeave={() => useHover(false)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
          }}
        >
          {hover ? (
            <div
              style={{ display: 'flex', flexDirection: 'row', width: '80%', overflow: 'hidden' }}
            >
              {expense.participants.map((name) => (
                <Chip
                  key={`participant-${name}`}
                  label={name}
                  color="primary"
                  sx={{ marginRight: '0.5rem' }}
                />
              ))}
            </div>
          ) : (
            <>
              <Typography sx={{ width: '30%' }}>{expense.payer}</Typography>
              <Box sx={{ ...s, flexGrow: 1 }}>
                <Typography>{expense.description}</Typography>
                <Typography>{expense.amount}</Typography>
              </Box>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExpenseCard;
