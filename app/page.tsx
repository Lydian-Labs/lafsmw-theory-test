"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useAuthContext } from "@/firebase/authContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  if (user) {
    router.push("/exam");
  }

  return (
    <main className="flex min-h-[500px] flex-col items-center justify-center mt-12 gap-20">
      <Typography variant="h3">Welcome to the LAFSMW Theory Test!</Typography>
      <Button variant="contained" color="primary">
        <Link href="/registration">
          <Typography>Register or Sign In Here</Typography>
        </Link>
      </Button>
    </main>
  );
}
