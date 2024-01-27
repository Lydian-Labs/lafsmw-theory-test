// SignUpForm.js
import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Container, Link, Typography } from "@mui/material";
import { signUp } from "@/firebase/authAPI";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { result, error } = await signUp(
      email,
      password,
      `${firstName} ${lastName}`
    );
    if (error) {
      return console.log("signUp error:", error);
    }
    console.log("signUp result:", result);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>
      </form>
      <Link href="/forgot-password" variant="body2" sx={{ mt: 2 }}>
        Forgot Password?
      </Link>
    </Container>
  );
};

export default SignUpForm;
