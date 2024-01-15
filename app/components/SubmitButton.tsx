import { Button, Grid, SxProps, Theme } from "@mui/material";
import { MouseEvent } from "../lib/typesAndInterfaces";

type ButtonProps = {
  labelText: string;
  onClick: (e: MouseEvent) => void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
};

export default function SubmitButton({
  onClick,
  sx,
  labelText,
  disabled,
}: ButtonProps) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={sx}
    >
      <Button
        sx={{
          color: "#2b2b2b",
          borderColor: "#2b2b2b",
          borderRadius: "8px",
          fontSize: "1em",
        }}
        type="button"
        disabled={disabled}
        onClick={onClick}
        variant="outlined"
      >
        {labelText}
      </Button>
    </Grid>
  );
}
