import { signIn } from "@/firebase/authAPI";
import { Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "../lib/typesAndInterfaces";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log("signIn error:", error);
    }
    console.log("signIn result:", result);
    router.push("/exam/key-signatures-note");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ fontFamily: "Monospace" }}>
      <Typography variant="h5" align="center">
        Sign In
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
          Sign In
        </Button>
      </form>
      <Link href="/forgot-password">Forgot Password?</Link>
    </Container>
  );
}
