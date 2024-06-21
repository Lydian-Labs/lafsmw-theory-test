"use client";
import { sendSignInEmail } from "@/firebase/authAPI";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendSignInEmail(email);
      setMessage("Verification email sent. Please check your inbox.");
      setEmail("");
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
      console.error("Error sending sign-in email:", err);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ fontFamily: "Monospace", paddingTop: "4rem" }}
    >
      <Typography variant="body1" align="center">
        Please enter your email address to receive a sign-in link.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
      {message && (
        <Typography variant="body1" align="center" fontSize="13px" mt={5}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography
          variant="body1"
          align="center"
          fontSize="13px"
          mt={5}
          style={{ color: "var(--salmonWarningColor)" }}
        >
          {error}
        </Typography>
      )}
    </Container>
  );
}
