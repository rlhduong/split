import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { request } from '../../../utilities/helper';
import { TripMain } from '../../../const/style';

interface SettleProps {
  tripId: number;
}

const Settle: FC<SettleProps> = ({ tripId }) => {
  const [transactions, setTransactions] = useState<Array<Array<String>>>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (tripId === 0) return;
      
      const res = await request.get(`/trips/${tripId}/expenses/settle`);
      setTransactions(res.data);
    };

    fetchTransactions();
  }, [tripId]);
  return (
    <Box sx={{...TripMain, minHeight: '17%', mb: '1.5rem'}}>
      <Typography variant="h5">Transactions</Typography>
      {transactions.length === 0 && (
        <Typography textAlign="center" mt="1.8rem">No transactions</Typography>
      )}
    </Box>
  );
};

export default Settle;
