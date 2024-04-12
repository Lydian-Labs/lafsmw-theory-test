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
          margin: 0.5,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default BlueButton;
