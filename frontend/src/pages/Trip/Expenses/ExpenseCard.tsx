import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { cardStyle } from '../../../const/style';
import { Expense } from './Expenses';

interface TransactionCardProps {
  expense: Expense;
}

const s = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const ExpenseCard = ({ expense }: TransactionCardProps) => {
  return (
    <Card sx={cardStyle}>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography sx={{ width: '30%' }}>{expense.payer}</Typography>
          <Box sx={{...s, flexGrow: 1}}>
            <Typography>{expense.description}</Typography>
            <Typography>{expense.amount}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExpenseCard;
