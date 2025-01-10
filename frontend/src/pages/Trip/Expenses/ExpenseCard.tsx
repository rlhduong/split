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
import DeleteIcon from '@mui/icons-material/Delete';
import { request } from '../../../utilities/helper';

interface TransactionCardProps {
  expense: Expense;
  reload: () => void;
}

const style = {
  s1: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    width: '100%',
  },
  s2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  s3: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    overflow: 'auto',
  },
};

const ExpenseCard = ({ expense, reload }: TransactionCardProps) => {
  const [hover, useHover] = useState(false);

  const handleClick = async () => {
    const res = await request.delete(
      `/trips/${expense.trip_id}/expenses/${expense.id}`
    );

    if (res.status !== 200) {
      return;
    }
    reload();
  };

  return (
    <Card sx={cardStyle}>
      <CardActionArea
        onMouseEnter={() => useHover(true)}
        onMouseLeave={() => useHover(false)}
      >
        <CardContent sx={style.s1}>
          {hover ? (
            <Box sx={style.s1}>
              <Box sx={style.s3}>
                {expense.participants.map((name) => (
                  <Chip
                    key={`participant-${name}`}
                    label={name}
                    color="primary"
                    sx={{ marginRight: '0.5rem' }}
                  />
                ))}
              </Box>
              <DeleteIcon
                sx={{ ml: 'auto', zIndex: 100 }}
                color="secondary"
                onClick={handleClick}
              />
            </Box>
          ) : (
            <>
              <Typography sx={{ width: '30%' }}>{expense.payer}</Typography>
              <Box sx={{ ...style.s2, flexGrow: 1 }}>
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
