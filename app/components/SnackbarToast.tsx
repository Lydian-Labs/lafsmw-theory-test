import { SyntheticEvent, Dispatch, SetStateAction } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Slide, SnackbarContent } from "@mui/material";

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
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top initially
      onClose={handleClose}
      TransitionComponent={Slide}
      ContentProps={{
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SnackbarContent
        style={{
          backgroundColor: "red",
          textAlign: "center",
          color: "white",
          maxWidth: "300px",
          margin: "0 auto",
          padding: "10px", // Reduce padding to decrease height
          borderRadius: "8px", // Optionally, add some border-radius
        }}
        message={message}
        action={action}
      />
    </Snackbar>
  );
}
