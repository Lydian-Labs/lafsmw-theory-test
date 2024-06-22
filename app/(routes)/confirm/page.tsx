"use client";
import { completeSignIn } from "@/firebase/authAPI";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateName from "@/app/components/UpdateName";

export default function ConfirmSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successBool, setSuccessBool] = useState(false);

  useEffect(() => {
    const handleSignIn = async () => {
      const emailLink = window.location.href;
      console.log("emailLink from confirm:", emailLink);

      try {
        const success = await completeSignIn(emailLink);
        if (success) {
          setSuccessBool(true);
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

  if (successBool) {
    return <UpdateName />;
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
        <Link href="/registration">
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
              Or sign up here
            </Typography>
          </Stack>
        </Link>
      </>
    );
  }

  return null;
}
