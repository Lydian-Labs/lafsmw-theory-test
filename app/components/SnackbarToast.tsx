import { SyntheticEvent, Dispatch, SetStateAction } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Slide } from "@mui/material";

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
  const handleClose = (event: Event | SyntheticEvent) => {
    setOpen((prev: boolean) => !prev);
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
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        message={message}
        action={action}
        TransitionComponent={Slide}
      />
    </div>
  );
}
