"use client";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

export default function Registration() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const toggleIsSignUp = () => {
    setIsSignUp((prev) => !prev);
    setShowButtons(false);
  };

  const toggleIsSignIn = () => {
    setIsSignIn((prev) => !prev);
    setShowButtons(false);
  };

  const goBack = () => {
    setShowButtons(true);
    setIsSignIn(false);
    setIsSignUp(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={4}>
        <Stack spacing={8}>
          {showButtons && (
            <Stack spacing={2}>
              <Typography>New to LAFSMW? Sign up here:</Typography>
              <Button variant="contained" onClick={toggleIsSignUp}>
                Sign Up
              </Button>
            </Stack>
          )}

          {showButtons && (
            <Stack spacing={2}>
              <Typography>Returning student? Sign in here:</Typography>
              <Button variant="contained" onClick={toggleIsSignIn}>
                Sign In
              </Button>
            </Stack>
          )}
        </Stack>
        {isSignUp && (
          <>
            <SignUpForm />
            <Button variant="text" onClick={goBack}>
              Go Back
            </Button>
          </>
        )}
        {isSignIn && (
          <>
            <SignInForm />
            <Button variant="text" onClick={goBack}>
              Go Back
            </Button>
          </>
        )}
      </Stack>
    </main>
  );
}
