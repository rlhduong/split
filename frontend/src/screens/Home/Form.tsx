import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { FC, useState } from 'react';

interface FormProps {
  open: boolean;
  type: boolean;
  handleClose: () => void;
}

const Form: FC<FormProps> = ({ open, type, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-dialog"
      aria-describedby="sign-in-or-sign-up"
    >
      <DialogTitle id="signin-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
				<SignIn/>
      </DialogContent>
    </Dialog>
  );
};

const SignIn = () => {
  const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (<Typography color='violet'>HELLO</Typography>)
};

export default Form;
