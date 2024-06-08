"use client";
import KeySigNotate1 from "@/app/components/ExamPages/1-1_KeySigNotate";
import KeySigNotate2 from "@/app/components/ExamPages/1-2_KeySigNotate";
import KeySigNotate3 from "@/app/components/ExamPages/1-3_KeySigNotate";
import KeySigNotate4 from "@/app/components/ExamPages/1-4_KeySigNotate";
import KeySigIdentify from "@/app/components/ExamPages/2_KeySigIdentify";
import ScalesNotate1 from "@/app/components/ExamPages/3-1_ScalesNotate";
import ScalesNotate2 from "@/app/components/ExamPages/3-2_ScalesNotate";
import ScalesNotate3 from "@/app/components/ExamPages/3-3_ScalesNotate";
import ScalesNotate4 from "@/app/components/ExamPages/3-4_ScalesNotate";
import ScalesNotate5 from "@/app/components/ExamPages/3-5_ScalesNotate";
import ScalesNotate6 from "@/app/components/ExamPages/3-6_ScalesNotate";

import TriadsNotate from "@/app/components/ExamPages/4_TriadsNotate";
import SeventhChordsNotate from "@/app/components/ExamPages/5_SeventhChordsNotate";
import ChordsIdentify from "@/app/components/ExamPages/6_ChordsIdentify";
import WriteProgressions from "@/app/components/ExamPages/7_WriteProgressions";
import WriteBluesChanges from "@/app/components/ExamPages/8_WriteBluesChanges";

import { useTimer } from "@/app/context/TimerContext";
import { checkAnswers } from "@/app/lib/calculateAnswers";
import convertObjectToArray from "@/app/lib/convertObjectToArray";
import convertObjectToChordChart from "@/app/lib/convertObjectToChordChart";
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
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamHomePage() {
  const { user } = useAuthContext();
  const { startTimer } = useTimer();
  const router = useRouter();

  const userName = user?.displayName;
  const userId = user?.uid;
  const initialState = {
    ...initialFormInputState,
    user: userName,
    userId: userId,
  };

  const VIEW_STATES = {
    START_TEST: 0,
    KEY_SIG_NOTATE1: 1,
    KEY_SIG_NOTATE2: 2,
    KEY_SIG_NOTATE3: 3,
    KEY_SIG_NOTATE4: 4,
    KEY_SIG_IDENTIFY: 5,
    SCALES_NOTATE1: 6,
    SCALES_NOTATE2: 7,
    SCALES_NOTATE3: 8,
    SCALES_NOTATE4: 9,
    SCALES_NOTATE5: 10,
    SCALES_NOTATE6: 11,
    TRIADS_NOTATE: 12,
    SEVENTH_CHORDS_NOTATE: 13,
    CHORDS_IDENTIFY: 14,
    WRITE_PROGRESSIONS: 15,
    WRITE_BLUES_CHANGES: 16,
    SUBMIT_AND_EXIT: 17,
  };

  const [currentUserData, setCurrentUserData] =
    useState<InputState>(initialState);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [viewState, setViewState] = useState(VIEW_STATES.START_TEST);
  const [timesUp, setTimesUp] = useState(false);
  const [isPDFReady, setIsPDFReady] = useState(false);

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

  const updateAnswers = async () => {
    const userChordAnswers = convertObjectToArray(currentUserData.chords);
    const userKeySigAnswers = convertObjectToArray(
      currentUserData.keySignatures
    );
    const userProgressionAnswers = convertObjectToArray(
      currentUserData.progressions
    );
    const chordChart = convertObjectToChordChart(currentUserData.blues);
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
    setUserAnswers([
      currentUserData.level,
      keySigAnswers,
      seventhAnswers,
      progressionAnswers,
      currentUserData.bluesUrl,
      chordChart,
    ]);
  };

  useEffect(() => {
    updateAnswers();
  }, [currentUserData]);

  const incrementViewState = () => {
    setViewState((prevState) => {
      return prevState + 1;
    });
  };

  const decrementViewState = () => {
    setViewState((prevState) => {
      return prevState - 1;
    });
  };

  const handleTimeUp = () => {
    setTimesUp(true);
    setViewState(VIEW_STATES.SUBMIT_AND_EXIT);
  };

  const handleStartTest = () => {
    startTimer(1800, handleTimeUp);
    setViewState(VIEW_STATES.KEY_SIG_NOTATE1);
  };

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }

      await setOrUpdateStudentData(currentUserData, userName);

      // Send email with results using API route
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.EMAIL_CAMP_DIRECTOR,
          subject: `Exam Results for ${userName}`,
          text: `<p>Hello Kyle,</p>

          <p>Here are the results for ${userName}:</p>
          <ul>
            <li>Level: ${userAnswers[0]}</li>
            <li>Key Signatures: ${userAnswers[1]}</li>
            <li>Seventh Chords: ${userAnswers[2]}</li>
            <li>II-V-I Progressions: ${userAnswers[3]}</li>
            <li>Link to blues progression pdf: ${userAnswers[4]}</li>
            <li>Blues progression chart: ${userAnswers[5]}</li>
          </ul>

          <p>Thank you,<br>Team at Lydian Labs Technology.</p>`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to send email: ${errorData.error}, Details: ${errorData.details}`
        );
      }

      await response.json();

      return router.push("/sign-out");
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  const goBackToPage1 = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }

      await setOrUpdateStudentData(currentUserData, userName);
      setViewState(VIEW_STATES.KEY_SIG_NOTATE1);
    } catch (error) {
      console.error("goBackToPage1 error:", error);
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
        {viewState !== VIEW_STATES.KEY_SIG_NOTATE1 &&
          viewState !== VIEW_STATES.SUBMIT_AND_EXIT &&
          viewState !== VIEW_STATES.START_TEST && (
            <Box>
              <Button onClick={decrementViewState}>
                <Typography variant="h4">{"<"}</Typography>
              </Button>
            </Box>
          )}
        {viewState === VIEW_STATES.START_TEST && (
          <Box>
            <Button variant="contained" onClick={handleStartTest}>
              <Typography variant="h4" p={2}>
                Begin Test
              </Typography>
            </Button>
          </Box>
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE1 && (
          <KeySigNotate1
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE2 && (
          <KeySigNotate2
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE3 && (
          <KeySigNotate3
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE4 && (
          <KeySigNotate4
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
        {viewState === VIEW_STATES.SCALES_NOTATE1 && (
          <ScalesNotate1
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE2 && (
          <ScalesNotate2
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE3 && (
          <ScalesNotate3
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE4 && (
          <ScalesNotate4
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE5 && (
          <ScalesNotate5
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE6 && (
          <ScalesNotate6
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
            isPDFReady={isPDFReady}
            setIsPDFReady={setIsPDFReady}
          />
        )}
        {viewState === VIEW_STATES.SUBMIT_AND_EXIT && (
          <main className="flex min-h-[500px] flex-col items-center justify-center mt-12 gap-20">
            <Typography variant="h3">Submit your answers</Typography>
            <Typography variant="body1" width={550} align="center">
              To submit your answers and exit the exam, click the button below.
              You will not be able to return to the exam after submitting. If
              you need to make changes and there is still time left, please
              click the button to go back to page 1.
            </Typography>
            <Stack direction={"column"} gap={4} p={4}>
              <Button onClick={handleFinalSubmit}>
                <Typography>Submit Final Answers</Typography>
              </Button>
              <Button onClick={goBackToPage1} disabled={timesUp ? true : false}>
                <Typography>Back to page 1</Typography>
              </Button>
            </Stack>
          </main>
        )}
        {viewState !== VIEW_STATES.SUBMIT_AND_EXIT &&
          viewState !== VIEW_STATES.START_TEST && (
            <Box>
              <Button onClick={incrementViewState}>
                <Typography variant="h4">{">"}</Typography>
              </Button>
              <Button
                onClick={() => setViewState(VIEW_STATES.WRITE_BLUES_CHANGES)}
              >
                <Typography>Go to Write Blues Changes</Typography>
              </Button>
            </Box>
          )}
      </Stack>
    </Box>
  );
}
