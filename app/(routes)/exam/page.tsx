"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import KeySigNote from "@/app/components/1KeySigNote";
import KeySigText from "@/app/components/2KeySigText";
import WriteScales from "@/app/components/3WriteScales";
import {
  getUserSnapshot,
  setOrUpdateStudentData,
} from "@/firebase/firestore/model";
import { useAuthContext } from "@/firebase/authContext";

export default function ExamHomePage() {
  const { user } = useAuthContext();
  const userName = user?.displayName;
  const userId = user?.uid;
  // console.log("user name and ID in ExamHomePage:", userName, userId);

  const router = useRouter();

  const VIEW_STATES = { KEY_SIG_NOTE: 1, KEY_SIG_TEXT: 2, WRITE_SCALES: 3 };
  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTE);
  const [currentUserData, setCurrentUserData] = useState<any>(null);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          setCurrentUserData(res[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user == null) {
      return router.push("/registration");
    } else {
      fetchSnapshot();
    }
  }, [router, user]);

  console.log("currentUserData after useEffect:", currentUserData);

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const added = await setOrUpdateStudentData(currentUserData, user);
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  return (
    <div>
      {viewState === VIEW_STATES.KEY_SIG_NOTE && (
        <KeySigNote
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.KEY_SIG_TEXT && <KeySigText />}
      {viewState === VIEW_STATES.WRITE_SCALES && <WriteScales />}
      <Stack
        direction={"row"}
        sx={{ display: "flex", justifyContent: "space-around" }}
        p={4}
      >
        <Button onClick={() => setViewState(VIEW_STATES.KEY_SIG_NOTE)}>
          Section 1
        </Button>
        <Button onClick={() => setViewState(VIEW_STATES.KEY_SIG_TEXT)}>
          Section 2
        </Button>
        <Button onClick={() => setViewState(VIEW_STATES.WRITE_SCALES)}>
          Section 3
        </Button>
      </Stack>
    </div>
  );
}
