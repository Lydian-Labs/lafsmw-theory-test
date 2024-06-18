"use client";
import { useAuthContext } from "@/firebase/authContext";
import { app } from "@/firebase/config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAnalytics } from "firebase/analytics";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  if (user) {
    router.push("/exam");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const analytics = getAnalytics(app);
    }
  }, []);

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
