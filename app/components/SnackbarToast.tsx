import { SyntheticEvent, Dispatch, SetStateAction } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fade, SnackbarContent } from "@mui/material";

type SimpleSnackbarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
};

export default function SimpleSnackbar({
  open,
  setOpen,
  message,
}: SimpleSnackbarProps) {
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="large"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="large" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      TransitionComponent={Fade}
      style={{
        position: "fixed",
        top: "35%",
      }}
    >
      <SnackbarContent
        style={{
          backgroundColor: "var(--colorFilledProgressBarColor)",
          textAlign: "center",
          fontSize: "1.5rem",
          color: "var(--primary10)",
          width: "100%",
          padding: "1rem",
          borderRadius: "var(--borderRadius)",
        }}
        message={message}
        action={action}
      />
    </Snackbar>
  );
}
