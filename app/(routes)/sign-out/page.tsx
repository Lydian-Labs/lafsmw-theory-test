"use client";
import { signOutOfApp } from "@/firebase/authAPI";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTimer } from "@/app/context/TimerContext";
import { useState } from "react";

export default function SignOutPage() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const { stopTimer } = useTimer();

  const signOutOfAppButton = () => {
    setDisabled(true);
    signOutOfApp();
    stopTimer();
    router.push("/");
  };

  return (
    <main className="flex min-h-[500px] flex-col items-center justify-center mt-12 gap-20">
      <Typography variant="h3">
        Congratulations! You have completed the exam.
      </Typography>
      <div>
        <Button
          variant="text"
          color="primary"
          disabled={disabled}
          onClick={signOutOfAppButton}
        >
          <Typography>
            {disabled ? "Signing out" : "Sign Out and Exit Exam"}
          </Typography>
        </Button>
      </div>
    </main>
  );
}
