"use client";
import KeySigNote from "@/app/components/ExamQuestions/1KeySigNote";
import KeySigText from "@/app/components/ExamQuestions/2KeySigText";
import NotateScales from "@/app/components/ExamQuestions/3NotateScales";
import NotateTriads from "@/app/components/ExamQuestions/4NotateTriads";
import NotateSeventhChords from "@/app/components/ExamQuestions/5Notate7thChords";
import IdentifyChordsPage from "@/app/components/ExamQuestions/6IdentifyChords";

import { InputState, MouseEvent } from "@/app/lib/typesAndInterfaces";

import { useAuthContext } from "@/firebase/authContext";
import {
  getUserSnapshot,
  setOrUpdateStudentData,
} from "@/firebase/firestore/model";

import { initialFormInputState } from "@/app/lib/initialStates";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamHomePage() {
  const { user } = useAuthContext();
  const userName = user?.displayName;
  const userId = user?.uid;
  const initialState = {
    ...initialFormInputState,
    user: userName,
    userId: userId,
  };

  const router = useRouter();

  const VIEW_STATES = {
    KEY_SIG_NOTE: 1,
    KEY_SIG_TEXT: 2,
    NOTATE_SCALES: 3,
    NOTATE_TRIADS: 4,
    NOTATE_7TH_CHORDS: 5,
    ID_CHORDS: 6,
  };
  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTE);

  const [currentUserData, setCurrentUserData] =
    useState<InputState>(initialState);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          let inputRes = { ...currentUserData, ...res[0] };
          setCurrentUserData(inputRes);
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

  const incrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.ID_CHORDS) {
        return VIEW_STATES.KEY_SIG_NOTE;
      } else {
        return prevState + 1;
      }
    });
  };

  const decrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.KEY_SIG_NOTE) {
        return VIEW_STATES.ID_CHORDS;
      } else {
        return prevState - 1;
      }
    });
  };

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }
      await setOrUpdateStudentData(currentUserData, userName);
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
      {viewState === VIEW_STATES.KEY_SIG_TEXT && (
        <KeySigText
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.NOTATE_SCALES && (
        <NotateScales
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.NOTATE_TRIADS && (
        <NotateTriads
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.NOTATE_7TH_CHORDS && (
        <NotateSeventhChords
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.ID_CHORDS && (
        <IdentifyChordsPage
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      <Stack
        direction={"row"}
        sx={{ display: "flex", justifyContent: "space-around" }}
        p={4}
      >
        <Button onClick={decrementViewState}>{"< Previous"}</Button>
        <Button onClick={incrementViewState}>{"Next >"}</Button>
        <Button onClick={handleFinalSubmit}>Submit to db</Button>
      </Stack>
    </div>
  );
}
