import { Button, Grid } from "@mui/material";
import { ButtonProps } from "../types";

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
