import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

interface ExpenseFormTopProps {
  payer: string;
  setPayer: (payer: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  friends: Array<string>;
}

const ExpenseFormTop = ({
  payer,
  friends,
  setPayer,
  setAmount,
  amount,
}: ExpenseFormTopProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <FormControl sx={{ width: '50%', mb: '2rem' }}>
        <InputLabel id="payer-name-label">Payer</InputLabel>
        <Select
          labelId="payer-name-label"
          id="payer-name-trip"
          value={payer}
          label="Payer"
          onChange={(e) => setPayer(e.target.value)}
        >
          {friends.map((friend) => (
            <MenuItem key={`participant-${friend}}`} value={friend}>
              {friend}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ width: '30%', ml: 'auto' }}
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
    </Box>
  );
};

export default ExpenseFormTop;
