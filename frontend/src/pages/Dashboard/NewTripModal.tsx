import { Box, Modal, Fade, Backdrop, Typography } from "@mui/material";
import { FC, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import useAlert from "../../hooks/useAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "50%", lg: "40%" },
  bgcolor: "background.paper",
  p: 4,
};

interface FormProps {
  open: boolean;
  handleClose: () => void;
}

const NewTripModal: FC<FormProps> = ({ open, handleClose }) => {
  const { openAlert, error, handleOpenAlert, handleCloseAlert } = useAlert();
  const { destination, setDestination } = useState(new Date());
  const { startDate, setStartDate } = useState();
  const { budget, setBudget } = useState(0);


  const reset = () => {
    handleClose();
    handleCloseAlert();
  };

  return (
    <Modal
      open={open}
      onClose={() => reset()}
      aria-labelledby="create-trip-dialog"
      aria-describedby="create-a-new-trip"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h2" component="h2" fontSize='1.5rem' mb='1rem' fontWeight="400">Start a new trip </Typography>
          <Typography variant="h4" component="h4" fontSize='1rem'>What is your trip called?</Typography> 
          <Typography variant="h4" component="h4" fontSize='1rem'>What is your destination?</Typography>
          <Typography variant="h4" component="h4" fontSize='1rem'>When are you starting</Typography>
          <Typography variant="h4" component="h4" fontSize='1rem'>What is your budget?</Typography>   
          <ErrorAlert
            open={openAlert}
            message={error}
            handleClose={handleCloseAlert}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTripModal;
