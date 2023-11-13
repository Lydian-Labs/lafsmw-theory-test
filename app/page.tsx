import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/system";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack direction="row" spacing={2}>
        <div>Hello World</div>
        <div>Hello World</div>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>Hello Box</Box>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "grey.300", height: "100vh" }}>Hello Box grey</Box>
        <Box sx={{ flexGrow: 1 }}>Hello Box flex grow</Box>
      </Container>
    </main>
  );
}
