import React from "react";
import Button from "@mui/material/Button";

interface BlueButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isEnabled?: boolean;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  onClick,
  children,
  isEnabled,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        "&.MuiButton-root": {
          backgroundColor: isEnabled ? "#F6D168" : "#a4b1bf",
          borderColor: isEnabled ? "#0063cc" : "#a4b1bf",
          margin: .5
          
        },
        "&:hover": {
          backgroundColor: "#0069d9",
          borderColor: "#0062cc",
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default BlueButton;
