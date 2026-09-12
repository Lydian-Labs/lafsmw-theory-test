import { isExistingPasswordAccount, sendSignInEmail } from "@/firebase/authAPI";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FormEvent } from "../lib/types";

type SignUpFormProps = {
  onExistingAccount: (email: string) => void;
};

export default function SignUpForm({ onExistingAccount }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSigningUp(true);
    setMessage("");
    try {
      const trimmedEmail = email.trim();
      if (await isExistingPasswordAccount(trimmedEmail)) {
        onExistingAccount(trimmedEmail);
        return;
      }
      await sendSignInEmail(trimmedEmail);
      setMessage(
        "Sign-up link sent! Please check your email (including your spam folder) to complete registration.",
      );
      setEmail("");
    } catch (error) {
      console.error("Error sending sign-in email:", error);
      setMessage("Failed to send sign-in link. Please try again.");
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ fontFamily: "Monospace" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up with Email Link
      </Typography>
      {message && (
        <Typography
          color={message.startsWith("Failed") ? "error" : "success"}
          align="center"
          sx={{ mb: 2, p: 4 }}
        >
          {message}
        </Typography>
      )}
      {!message && (
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={signingUp}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={signingUp}
          >
            {signingUp ? "Sending Link..." : "Send Sign-Up Link"}
          </Button>
        </form>
      )}
    </Container>
  );
}
