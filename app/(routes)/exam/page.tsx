"use client";
import KeySigNotate from "@/app/components/ExamPages/1_KeySigNotate";
import KeySigIdentify from "@/app/components/ExamPages/2_KeySigIdentify";
import ScalesNotate from "@/app/components/ExamPages/3_ScalesNotate";
import TriadsNotate from "@/app/components/ExamPages/4_TriadsNotate";
import SeventhChordsNotate from "@/app/components/ExamPages/5_SeventhChordsNotate";
import ChordsIdentify from "@/app/components/ExamPages/6_ChordsIdentify";
import WriteProgressions from "@/app/components/ExamPages/7_WriteProgressions";
import WriteBluesChanges from "@/app/components/ExamPages/8_WriteBluesChanges";

import { checkAnswers } from "@/app/lib/calculateAnswers";
import convertObjectToArray from "@/app/lib/convertObjectToArray";
import {
  exampleCorrectKeySigAnswers,
  exampleCorrectProgressionAnswers,
  exampleCorrectSeventhChordAnswers,
} from "@/app/lib/data/answerKey";
import { initialFormInputState } from "@/app/lib/initialStates";
import { InputState, MouseEvent } from "@/app/lib/typesAndInterfaces";

import { useAuthContext } from "@/firebase/authContext";
import {
  getUserSnapshot,
  setOrUpdateStudentData,
} from "@/firebase/firestore/model";

import { Box, Button, Stack, Container, Typography } from "@mui/material";
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
    KEY_SIG_NOTATE: 1,
    KEY_SIG_IDENTIFY: 2,
    SCALES_NOTATE: 3,
    TRIADS_NOTATE: 4,
    SEVENTH_CHORDS_NOTATE: 5,
    CHORDS_IDENTIFY: 6,
    WRITE_PROGRESSIONS: 7,
    WRITE_BLUES_CHANGES: 8,
    SUBMIT_AND_EXIT: 9,
  };

  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTATE);

  const [currentUserData, setCurrentUserData] =
    useState<InputState>(initialState);

  const [userAnswers, setUserAnswers] = useState<string[]>([]);

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
      if (prevState === VIEW_STATES.SUBMIT_AND_EXIT) {
        return VIEW_STATES.KEY_SIG_NOTATE;
      } else {
        return prevState + 1;
      }
    });
  };

  const decrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.KEY_SIG_NOTATE) {
        return VIEW_STATES.SUBMIT_AND_EXIT;
      } else {
        return prevState - 1;
      }
    });
  };

  const userChordAnswers = convertObjectToArray(currentUserData.chords);

  const userKeySigAnswers = convertObjectToArray(currentUserData.keySignatures);

  const userProgressionAnswers = convertObjectToArray(
    currentUserData.progressions
  );

  const updateAnswers = () => {
    let keySigAnswers = checkAnswers(
      userKeySigAnswers,
      exampleCorrectKeySigAnswers,
      "Key Signatures"
    );
    let seventhAnswers = checkAnswers(
      userChordAnswers,
      exampleCorrectSeventhChordAnswers,
      "Seventh Chords"
    );
    let progressionAnswers = checkAnswers(
      userProgressionAnswers,
      exampleCorrectProgressionAnswers,
      "II-V-I Progressions"
    );
    setUserAnswers([keySigAnswers, seventhAnswers, progressionAnswers]);
  };

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }
      await setOrUpdateStudentData(currentUserData, userName);
      updateAnswers();
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  const handleEndExam = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }
      console.log("userAnswers:", userAnswers);
      return router.push("/sign-out");
    } catch (error) {
      console.error("handleEndExam error:", error);
    }
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        p={4}
      >
        {viewState !== VIEW_STATES.KEY_SIG_NOTATE &&
          viewState !== VIEW_STATES.SUBMIT_AND_EXIT && (
            <Box>
              <Button onClick={decrementViewState}>
                <Typography>{"< Previous"}</Typography>
              </Button>
            </Box>
          )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE && (
          <KeySigNotate
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_IDENTIFY && (
          <KeySigIdentify
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE && (
          <ScalesNotate
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE && (
          <TriadsNotate
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE && (
          <SeventhChordsNotate
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.CHORDS_IDENTIFY && (
          <ChordsIdentify
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.WRITE_PROGRESSIONS && (
          <WriteProgressions
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.WRITE_BLUES_CHANGES && (
          <WriteBluesChanges
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SUBMIT_AND_EXIT && (
          <main className="flex min-h-[500px] flex-col items-center justify-center mt-12 gap-20">
            <Typography variant="h3" marginLeft={8}>
              Congratulations! You have completed the exam.
            </Typography>
            <Stack direction={"column"} gap={4} p={4}>
              <Button onClick={handleFinalSubmit}>
                <Typography>Submit Final Answers</Typography>
              </Button>
              <Button onClick={handleEndExam}>
                <Typography>Send Results to Kyle</Typography>
              </Button>
            </Stack>
          </main>
        )}
        {viewState !== VIEW_STATES.SUBMIT_AND_EXIT && (
          <Box>
            <Button onClick={incrementViewState}>
              <Typography>{"Next >"}</Typography>
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
