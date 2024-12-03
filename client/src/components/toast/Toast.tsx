import React from "react";
import {
  Alert,
  Snackbar,
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material";
import { ToastOptions } from "../../types";

interface ToastProps extends SnackbarProps {
  setOptions: React.Dispatch<React.SetStateAction<ToastOptions>>;
  options: ToastOptions;
}

export const Toast: React.FC<ToastProps> = ({
  options,
  setOptions,
  ...props
}) => {
  const { open, severity, message } = options;

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    _reason?: SnackbarCloseReason
  ) => {
    setOptions((prev: any) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={5000}
      onClose={handleClose}
      open={open}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={severity ? severity : "info"}
        variant="filled"
        sx={{
          width: "100%",
          ...(severity === "success" && {
            backgroundColor: "#3e8bd2",
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
