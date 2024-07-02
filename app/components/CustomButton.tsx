import Button from "@mui/material/Button";
import { FC, ReactNode } from "react";

interface CustomButtonProps {
  onClick: () => void;
  children: ReactNode;
  isEnabled?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
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
          backgroundColor: isEnabled
            ? "var(--colorEnabledButtonColor)"
            : "var(--colorPressedButtonColor)",
          borderColor: isEnabled ? "#0063cc" : "#a4b1bf",
          borderRadius: "var(--borderRadius)",
          margin: 0.5,
        },
        "&:hover": {
          backgroundColor: "var(--colorUnfilledProgressBarColor)",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
