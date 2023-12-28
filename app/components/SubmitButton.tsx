import { Button, Grid, SxProps, Theme } from "@mui/material";
import { MouseEvent } from "../types";

type ButtonProps = {
  labelText: string;
  onClick: (e: MouseEvent) => void;
  sx?: SxProps<Theme>;
};

export default function SubmitButton({ onClick, sx, labelText }: ButtonProps) {
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
        onClick={onClick}
        variant="outlined"
      >
        {labelText}
      </Button>
    </Grid>
  );
}
