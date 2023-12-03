import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/system";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={4}>
        <h1>Welcome to the LAFSMW Theory Test</h1>
        <Button variant="contained">Sign In</Button>
        <Button variant="contained">Sign Up</Button>
      </Stack>
    </main>
  );
}
