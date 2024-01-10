import { Button, styled } from "@mui/material/";
import React, { ReactNode, MouseEventHandler } from "react";

interface BlueButtonProps {
  onClick: MouseEventHandler;
  children: ReactNode;
  value?: string;
  isEnabled?: boolean;
}

const BlueButtonStyled = styled(Button)(
  ({ isEnabled: isEnabled }: BlueButtonProps) => ({
    "&&": {
      boxShadow: "none",
      textTransform: "none",
      fontSize: isEnabled ? 18 : 16,
      padding: isEnabled ? "10px 16px" : "8px 14px",
      margin: "5px",
      border: "2px solid",
      lineHeight: 1.5,
      backgroundColor: isEnabled ? "#0063cc" : "#cad1d9",
      borderColor: isEnabled ? "#0063cc" : "#a4b1bf",
    },
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  })
);

const BlueButton: React.FC<BlueButtonProps> = ({
  onClick,
  children,
  isEnabled: isEnabled,
}) => {
  return (
    <BlueButtonStyled
      variant="contained"
      onClick={onClick}
      isEnabled={isEnabled}
    >
      {children}
    </BlueButtonStyled>
  );
};

export default BlueButton;