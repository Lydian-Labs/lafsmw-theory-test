"use client";
import KeySigNotate from "@/app/components/ExamQuestions/1KeySigNotate";
import KeySigIdentify from "@/app/components/ExamQuestions/2KeySigIdentify";
import ScalesNotate from "@/app/components/ExamQuestions/3ScalesNotate";
import TriadsNotate from "@/app/components/ExamQuestions/4TriadsNotate";
import SeventhChordsNotate from "@/app/components/ExamQuestions/5SeventhChordsNotate";
import ChordsIdentify from "@/app/components/ExamQuestions/6ChordsIdentify";
import { checkSeventhChords } from "@/app/lib/calculateAnswers";
import { exampleCorrectSeventhChordAnswers } from "@/app/lib/answerKey";

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
import convertObjectToArray from "@/app/lib/convertObjectToArray";

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
    KEY_SIG_NOTATE: 1,
    KEY_SIG_IDENTIFY: 2,
    SCALES_NOTATE: 3,
    TRIADS_NOTATE: 4,
    SEVENTH_CHORDS_NOTATE: 5,
    CHORDS_IDENTIFY: 6,
  };

  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTATE);

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
      if (prevState === VIEW_STATES.CHORDS_IDENTIFY) {
        return VIEW_STATES.KEY_SIG_NOTATE;
      } else {
        return prevState + 1;
      }
    });
  };

  const decrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.KEY_SIG_NOTATE) {
        return VIEW_STATES.CHORDS_IDENTIFY;
      } else {
        return prevState - 1;
      }
    });
  };

  const exampleUserAnswers = convertObjectToArray(currentUserData.chords);

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }
      await setOrUpdateStudentData(currentUserData, userName);
      return checkSeventhChords(
        exampleUserAnswers,
        exampleCorrectSeventhChordAnswers
      );
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  return (
    <div>
      {viewState === VIEW_STATES.KEY_SIG_NOTATE && (
        <KeySigNotate
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.KEY_SIG_IDENTIFY && (
        <KeySigIdentify
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.SCALES_NOTATE && (
        <ScalesNotate
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.TRIADS_NOTATE && (
        <TriadsNotate
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE && (
        <SeventhChordsNotate
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.CHORDS_IDENTIFY && (
        <ChordsIdentify
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
