import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

import { useState } from 'react';

interface ExpenseFormBtmProps {
  friends: Array<string>;
  setParticipants: (participants: string[]) => void;
}

const ExpenseFormBtm = ({ friends, setParticipants }: ExpenseFormBtmProps) => {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(friends.length).fill(false)
  );

  return (
    <Box>
      <FormControl sx={{ mt: '2rem' }} component="fieldset" variant="standard">
        <FormLabel component="legend">Participant</FormLabel>
        <FormGroup>
          {friends.map((friend, index) => {
            const handleChange = (i: number) => {
              const newChecked = [...checked];
              newChecked[i] = !newChecked[i];
              setChecked(newChecked);

              const newParticipants: string[] = [];
              newChecked.forEach((value, index) => {
                if (value) {
                  newParticipants.push(friends[index]);
                }
              });
              setParticipants(newParticipants);
            };

            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => handleChange(index)}
                    name={friend}
                  />
                }
                label={friend}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ExpenseFormBtm;
