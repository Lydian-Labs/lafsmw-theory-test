"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeSignIn } from "@/firebase/authAPI";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function ConfirmSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSignIn = async () => {
      const emailLink = window.location.href;
      const emailForSignIn = window.localStorage.getItem("emailForSignIn");

      if (!emailForSignIn) {
        setError("No email found for sign-in.");
        setLoading(false);
        return;
      }

      try {
        const success = await completeSignIn(emailForSignIn, emailLink);
        if (success) {
          router.push("/exam");
        } else {
          setError("Sign-in failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred during sign-in.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    handleSignIn();
  }, [router]);

  if (loading) {
    return (
      <Typography variant="body1" p={4}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <>
        <Typography variant="h6" align="center" p={4}>
          {error}
        </Typography>
        <Link href="/login">
          <Stack alignItems={"center"}>
            <Typography
              variant="body1"
              width={"190px"}
              border={"1px solid"}
              borderRadius={"12px"}
              p={4}
              sx={{
                "&:hover": { color: "var(--primary40)", border: "none" },
              }}
            >
              Return to login
            </Typography>
          </Stack>
        </Link>
      </>
    );
  }

  return null;
}
