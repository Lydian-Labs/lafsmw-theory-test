"use client";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={4}>
        {showButtons && (
          <>
            <h1>Welcome to the LAFSMW Theory Test</h1>
            <Button variant="contained" onClick={toggleIsSignUp}>
              Sign Up
            </Button>
            <Button variant="contained" onClick={toggleIsSignIn}>
              Sign In
            </Button>
          </>
        )}
        {isSignUp && <SignUpForm />}
        {isSignIn && <SignInForm />}
      </Stack>
    </main>
  );
}
