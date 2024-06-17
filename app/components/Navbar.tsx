"use client";
import { signOutOfApp } from "@/firebase/authAPI";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useAuthContext } from "@/firebase/authContext";
import CountdownTimer from "./CountdownTimer";

const Navbar: FC = () => {
  const router = useRouter();
  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/");
  };

  const { user } = useAuthContext();

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 11">
        <div className="text-center sm:flex left-0 top-0 w-full z-[3] ease-in duration-300 text-black">
          <div className="flex p-4 justify-between">
            <Link href="/">
              <h1 className="text-3xl">
                Lafayette Jazz Workshop Placement Exam
              </h1>
            </Link>
          </div>
          <ul className="hidden sm:text-1xl py-20 sm:py-1 sm:flex">
            <li className="p-4">
              <Link href="/registration">Register</Link>
            </li>
            <li className="p-4">
              <Link href="/exam">Exam</Link>
            </li>
          </ul>
        </div>
        {user !== null && (
          <Box>
            <CountdownTimer />
          </Box>
        )}
      </Box>

      <Box gridColumn="span 1" padding={2}>
        {user !== null ? (
          <div>
            <Button variant="text" color="primary" onClick={signOutOfAppButton}>
              <Stack>
                <Typography fontSize={"10px"}>{user.email}</Typography>
                <Typography>Sign Out</Typography>
              </Stack>
            </Button>
          </div>
        ) : null}
      </Box>
    </Box>
  );
};

export default Navbar;
