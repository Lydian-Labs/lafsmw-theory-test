import { Button, styled } from "@mui/material/";
import React, { ReactNode, MouseEventHandler } from "react";

const BlueButtonStyled = styled(Button)({
  "&&": {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    margin: "5px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

interface BlueButtonProps {
  onClick,
  children: ReactNode;
  value?: string
}

const BlueButton: React.FC<BlueButtonProps> = ({ onClick, children }) => {
  return (
    <BlueButtonStyled variant="contained" onClick={onClick}>
      {children}
    </BlueButtonStyled>
  );
};

export default BlueButton;
