import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const Dialog = ({
  title = "Title",
  btnLabel = "save",
  open,
  form,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick?: () => void;
  form?: string;
  title?: string;
  btnLabel?: string;
  children?: JSX.Element;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ height: "100%", pb: "2rem !important", overflow: "hidden" }}
        dividers
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Box sx={{ py: 2, width: "100%" }}>
          <Button
            variant="contained"
            fullWidth
            {...(form && { form })}
            type={form ? "submit" : "button"}
          >
            {btnLabel}
          </Button>
        </Box>
      </DialogActions>
    </BootstrapDialog>
  );
};
