import EastIcon from '@mui/icons-material/East';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { cardStyle } from '../../../const/style';

interface TransactionCardProps {
  transaction: string[];
}

const s = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Card sx={cardStyle}>
      <CardActionArea>
        <CardContent sx={s}>
          <Box sx={{ ...s, width: '35%' }}>
            <Typography maxWidth="70%">{transaction[0]}</Typography>
            <EastIcon color='secondary'/>
          </Box>
          <Box sx={{ ...s, width: '40%' }}>
            <Typography maxWidth="70%">{transaction[1]}</Typography>
            <Typography maxWidth="70%" color='#2e96ff'>{transaction[2]}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TransactionCard;
