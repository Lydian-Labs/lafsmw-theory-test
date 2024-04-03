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

import { useAuthContext } from "@/firebase/authContext";

export default function ExamHomePage() {
  const { user } = useAuthContext();
  const router = useRouter();

  const VIEW_STATES = { KEY_SIG_NOTE: 1, KEY_SIG_TEXT: 2, WRITE_SCALES: 3 };
  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTE);

  useEffect(() => {
    if (user == null) {
      return router.push("/registration");
    }
  }, [router, user]);

  return (
    <div>
      {viewState === VIEW_STATES.KEY_SIG_NOTE && <KeySigNote />}
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
