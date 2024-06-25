import { LayoutProps } from "@/src/interfaces/LayoutProps";
import { SnackAlertProps } from "@/src/interfaces/SnackAlertProps";
import { Alert, Snackbar } from "@mui/material";
import React from "react";


const SnackAlert: React.FC<SnackAlertProps> = ({
  handleErreur,
  open,
  severity,
  message
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleErreur}>
      <Alert
        onClose={handleErreur}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackAlert;
