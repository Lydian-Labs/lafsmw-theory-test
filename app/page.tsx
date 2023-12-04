import Stack from "@mui/material/Stack";
import Navbar from "./components/Navbar";
import { Box, Container } from "@mui/system";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack direction="row" spacing={2}>
       
      </Stack>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "grey.300", height: "100vh" }}></Box>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Container>
    </main>
  );
}
