"use client";
import { Button, Container, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";

const ForgotPassword = () => {
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Forgot Password logic to be implemented");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
