import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const descriptions = [
  'Flights',
  'Accommodation',
  'Food & Drinks',
  'Transportation (Local)',
  'Activities & Tours',
  'Travel Insurance',
  'Souvenirs',
  'Entertainment',
  'Emergency Expenses',
  'Miscellaneous',
];

interface ExpenseFormMidProps {
  description: string;
  setDescription: (description: string) => void;
}

const ExpenseFormMid = ({
  description,
  setDescription,
}: ExpenseFormMidProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="description-label">Description</InputLabel>
      <Select
        labelId="payer-name-label"
        id="description-trip"
        value={description}
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
      >
        {descriptions.map((description) => (
          <MenuItem key={`participant-${description}}`} value={description}>
            {description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ExpenseFormMid;
