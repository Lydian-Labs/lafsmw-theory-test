"use client";
import { sendSignInEmail } from "@/firebase/authAPI";
import { useAuthContext } from "@/firebase/authContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user !== null) {
      router.push("/exam");
    }
  }, [router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setDisabled(true);
    try {
      await sendSignInEmail(email);
      setMessage(
        "Verification email sent. Please close this tab and check your inbox."
      );
      setEmail("");
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
      setDisabled(false);
      console.error("Error sending sign-in email:", err);
    }
  };

  return (
    <Container
      component="main"
      sx={{ fontFamily: "Monospace", paddingTop: "4rem" }}
    >
      {message === "" && error === "" && (
        <Box>
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
              disabled={disabled}
            >
              {disabled ? "Sent" : "Send Sign-In Link"}
            </Button>
          </form>
        </Box>
      )}
      {message && (
        <>
          <Typography variant="body1" align="center" fontSize="16px" mt={5}>
            {message}
          </Typography>
          <Typography variant="body1" align="center" fontSize="16px" mt={5}>
            If you did not receive an email after a few moments, please click{" "}
            <Link href="/registration">
              <b>here.</b>
            </Link>
          </Typography>
        </>
      )}
      {error && (
        <Typography
          variant="body1"
          align="center"
          fontSize="16px"
          mt={5}
          style={{ color: "var(--salmonWarningColor)" }}
        >
          {error}
        </Typography>
      )}
    </Container>
  );
}
