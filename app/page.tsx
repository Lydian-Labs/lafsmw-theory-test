"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useAuthContext } from "@/firebase/authContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext();
  console.log("user:", user);
  const router = useRouter();
  if (user) {
    router.push("/exam-new");
  }

  return (
    <main className="flex min-h-[500px] flex-col items-center justify-start mt-12 gap-20">
      <Typography variant="h3">Welcome to the LAFSMW Theory Test!</Typography>
      <Button variant="contained" color="primary">
        <Link href="/registration">Register or Sign In Here</Link>
      </Button>
    </main>
  );
}
