import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { request } from '../../utilities/helper';
interface SettleProps {
  tripId: number;
}

const s = {
  width: '100%',
  borderRadius: '10px',
  minHeight: '17%',
  border: '2px solid #0c4c92',
  padding: '2% 3%',
  boxSizing: 'border-box',
};

const Settle: FC<SettleProps> = ({ tripId }) => {
  const [transactions, setTransactions] = useState<Array<Array<String>>>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await request.get(`/trips/${tripId}/expenses/settle`);
      console.log(res.data);
      setTransactions(res.data);
    };

    fetchTransactions();
  }, [tripId]);
  return (
    <Box sx={s}>
      <Typography variant="h5">Transactions</Typography>
      {transactions.length === 0 && (
        <Typography textAlign="center" mt="1.8rem">No transactions</Typography>
      )}
    </Box>
  );
};

export default Settle;
