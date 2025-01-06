import { useState } from "react";

const useAlert = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("");

  const handleOpenAlert = (message: string) => {
    setError(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setError("");
    setOpenAlert(false);
  };

  return {
    openAlert,
    error,
    handleOpenAlert,
    handleCloseAlert,
  };
};

export default useAlert;
