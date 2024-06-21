"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeSignIn } from "@/firebase/authAPI";
import { Button, Typography } from "@mui/material";

const ConfirmSignIn = () => {
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/login")}
        />
      </>
    );
  }

  return null;
};

export default ConfirmSignIn;
