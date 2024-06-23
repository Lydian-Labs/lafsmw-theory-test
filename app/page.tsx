"use client";
import { useAuthContext } from "@/firebase/authContext";
import { app } from "@/firebase/config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAnalytics } from "firebase/analytics";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/exam");
    }
  }, [router, user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const analytics = getAnalytics(app);
    }
  }, []);

  function handleLogin() {
    setLoggingIn(true);
    router.push("/login");
  }

  return (
    <main className="flex min-h-[500px] flex-col items-center justify-center mt-12 gap-20">
      <Typography variant="h3">Welcome to the LAFSMW Theory Test!</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loggingIn}
      >
        <Typography>{loggingIn ? "Logging in..." : "Login Here"}</Typography>
      </Button>
    </main>
  );
}
