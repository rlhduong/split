import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { request } from '../../../utilities/helper';
import { TripMain } from '../../../const/style';
import TransactionCard from './TransactionCard';
import { TripInfo } from '../../../utilities/interface';

interface SettleProps {
  trip: TripInfo;
}

const Settle: FC<SettleProps> = ({ trip }) => {
  const [transactions, setTransactions] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (trip.id === 0) return;

      const res = await request.get(`/trips/${trip.id}/expenses/settle`);
      setTransactions(res.data);
    };

    fetchTransactions();
  }, [trip]);
  return (
    <Box sx={{ ...TripMain, minHeight: '17%', mb: '1.5rem' }}>
      <Typography variant="h5" mb="1.5rem">Transactions</Typography>
      {transactions.length === 0 && (
        <Typography textAlign="center" mt="1.8rem">
          No transactions
        </Typography>
      )}
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={`transaction-${index}`}
          transaction={transaction}
        />
      ))}
    </Box>
  );
};

export default Settle;
