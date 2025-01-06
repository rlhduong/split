import { useState } from "react";

const useOpenForm = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return {
    openForm,
    handleOpenForm,
    handleCloseForm
  };
};

export default useOpenForm;
