"use client";
import { signOutOfApp } from "@/firebase/authAPI";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useAuthContext } from "@/firebase/authContext";

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
              <h1 className="text-2xl sm:text-3xl">Vexflow Projects</h1>
            </Link>
          </div>

          <ul className="hidden sm:text-1xl py-20 sm:py-1 sm:flex">
            <li className="p-4">
              <Link href="/examSample">Exam Sample</Link>
            </li>

            <li className="p-4">
              <Link href="/NoteAndAccidentalInput">
                Note and Accidental Input Demo
              </Link>
            </li>
          </ul>
        </div>
      </Box>

      <Box gridColumn="span 1">
        {user !== null ? (
          <div>
            <Button variant="text" color="primary" onClick={signOutOfAppButton}>
              Sign Out {user.email}
            </Button>
          </div>
        ) : null}
      </Box>
    </Box>
  );
};

export default Navbar;
