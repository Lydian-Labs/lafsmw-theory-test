"use client";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className="flex min-h-[500px] flex-col items-center justify-start mt-12 gap-20">
      <Typography variant="h3">Welcome to the LAFSMW Theory Test!</Typography>
      <Button variant="contained" color="primary">
        <Link href="/registration">Register Here</Link>
      </Button>
    </main>
  );
}
