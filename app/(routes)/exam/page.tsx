"use client";
import ChordsIdentify from "@/app/components/ExamPages/ChordsIdentify";
import KeySigIdentify from "@/app/components/ExamPages/KeySigIdentify";
import KeySigNotate1 from "@/app/components/ExamPages/KeySigNotate1";
import KeySignaturesNotation from "@/app/components/ExamPages/KeySigNotateTemplate";
import ScalesNotation from "@/app/components/ExamPages/ScalesNotateTemplate";
import SeventhChordsNotation from "@/app/components/ExamPages/SeventhChordsNotateTemplate";
import TriadsNotation from "@/app/components/ExamPages/TriadsNotateTemplate";
import WriteBluesChanges from "@/app/components/ExamPages/WriteBluesChanges";
import WriteProgressions from "@/app/components/ExamPages/WriteProgressions";
import ClassPreferenceSelector from "@/app/components/ClassPreferenceSelector";
import ClefPreferenceSelector from "@/app/components/ClefPreferenceSelector";
import { useTimer } from "@/app/context/TimerContext";
import {
  checkAnswers,
  checkArrOfArrsAnswer,
  checkProgressionAnswers,
} from "@/app/lib/calculateAnswers";
import convertObjectToArray from "@/app/lib/convertObjectToArray";
import convertObjectToChordChart from "@/app/lib/convertObjectToChordChart";
import {
  correctKeySigAnswers,
  correctKeySigNotationAnswers,
  correctProgressionAnswers,
  correctScalesAnswers,
  correctSeventhChordAnswers,
  correctSeventhChordNotationAnswers,
  correctTriadAnswers,
} from "@/app/lib/data/answerKey";
import { initialFormInputState } from "@/app/lib/initialStates";
import { InputState, MouseEvent, Level } from "@/app/lib/typesAndInterfaces";
import { useAuthContext } from "@/firebase/authContext";
import {
  getUserSnapshot,
  setOrUpdateStudentData,
} from "@/firebase/firestore/model";
import { Box, Button, Stack, Typography, Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useClef } from "@/app/context/ClefContext";
import SnackbarToast from "@/app/components/SnackbarToast";
import CardFooter from "@/app/components/CardFooter";
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
  TRIADS_NOTATE1: 12,
  TRIADS_NOTATE2: 13,
  TRIADS_NOTATE3: 14,
  TRIADS_NOTATE4: 15,
  TRIADS_NOTATE5: 16,
  TRIADS_NOTATE6: 17,
  SEVENTH_CHORDS_NOTATE1: 18,
  SEVENTH_CHORDS_NOTATE2: 19,
  SEVENTH_CHORDS_NOTATE3: 20,
  SEVENTH_CHORDS_NOTATE4: 21,
  SEVENTH_CHORDS_NOTATE5: 22,
  SEVENTH_CHORDS_NOTATE6: 23,
  CHORDS_IDENTIFY: 24,
  WRITE_PROGRESSIONS: 25,
  WRITE_BLUES_CHANGES: 26,
  SUBMIT_AND_EXIT: 27,
};

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

  const [currentUserData, setCurrentUserData] =
    useState<InputState>(initialState);
  const [correctedAnswers, setCorrectedAnswers] = useState<string[]>([]);
  const [viewState, setViewState] = useState(VIEW_STATES.START_TEST);
  const [timesUp, setTimesUp] = useState(false);
  const [isPDFReady, setIsPDFReady] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>("select-here");
  const { clef, setClef } = useClef();

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          setCurrentUserData((prevCurrentUserData) => ({
            ...prevCurrentUserData,
            ...res[0],
          }));
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

  const updateAnswers = useCallback(async () => {
    const userKeySigNotationAnswers = [
      currentUserData.keySignaturesNotation1,
      currentUserData.keySignaturesNotation2,
      currentUserData.keySignaturesNotation3,
      currentUserData.keySignaturesNotation4,
    ];
    const userKeySigAnswers = convertObjectToArray(
      currentUserData.keySignatures
    );
    const userScales = [
      currentUserData.scales1,
      currentUserData.scales2,
      currentUserData.scales3,
      currentUserData.scales4,
      currentUserData.scales5,
      currentUserData.scales6,
    ];
    const userTriads = [
      currentUserData.triads1,
      currentUserData.triads2,
      currentUserData.triads3,
      currentUserData.triads4,
      currentUserData.triads5,
      currentUserData.triads6,
    ];
    const userSeventhChordAnswers = [
      currentUserData.seventhChords1,
      currentUserData.seventhChords2,
      currentUserData.seventhChords3,
      currentUserData.seventhChords4,
      currentUserData.seventhChords5,
      currentUserData.seventhChords6,
    ];
    const userChordAnswers = convertObjectToArray(currentUserData.chords);

    const userProgressionAnswers = convertObjectToArray(
      currentUserData.progressions
    );

    let keySigNotationAnswers = checkArrOfArrsAnswer(
      userKeySigNotationAnswers,
      correctKeySigNotationAnswers,
      "Key Signature Notation"
    );
    let keySigAnswers = checkAnswers(
      userKeySigAnswers,
      correctKeySigAnswers,
      "Key Signatures"
    );
    let scalesAnswers = checkArrOfArrsAnswer(
      userScales,
      correctScalesAnswers,
      "Scales"
    );
    let triadsAnswers = checkArrOfArrsAnswer(
      userTriads,
      correctTriadAnswers,
      "Triads"
    );
    let seventhNotationAnswers = checkArrOfArrsAnswer(
      userSeventhChordAnswers,
      correctSeventhChordNotationAnswers,
      "Seventh Chord Notation"
    );
    let seventhAnswers = checkAnswers(
      userChordAnswers,
      correctSeventhChordAnswers,
      "Seventh Chords"
    );
    let progressionAnswers = checkProgressionAnswers(
      userProgressionAnswers,
      correctProgressionAnswers,
      "2-5-1 Progressions"
    );

    const chordChart = convertObjectToChordChart(currentUserData.blues);
    setCorrectedAnswers([
      currentUserData.level,
      keySigNotationAnswers,
      keySigAnswers,
      scalesAnswers,
      triadsAnswers,
      seventhNotationAnswers,
      seventhAnswers,
      progressionAnswers,
      currentUserData.bluesUrl,
      chordChart,
    ]);
  }, [currentUserData]);

  useEffect(() => {
    updateAnswers();
  }, [updateAnswers, currentUserData]);

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

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    setCurrentUserData({
      ...currentUserData,
      level: level,
    });
  };

  const handleStartTest = (handleSubmit: (e: MouseEvent) => Promise<void>) => {
    return async (e: MouseEvent) => {
      e.preventDefault();
      if (level === "select-here") {
        setOpen(true);
        return;
      }
      await handleSubmit(e);
      startTimer(1800, handleTimeUp);
      setViewState(VIEW_STATES.KEY_SIG_NOTATE1);
    };
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
          email: process.env.NEXT_PUBLIC_EMAIL_CAMP_DIRECTOR,
          subject: `Exam Results for ${userName}`,
          text: `<p>Hello Kyle,</p>

          <p>Here are the results for ${userName}:</p>
          <ul>
            <li>Level:${correctedAnswers[0]}</li>
            <li>Key Signatures (notate): ${correctedAnswers[1]}</li>
            <li>Key Signatures (identify): ${correctedAnswers[2]}</li>
            <li>Scales: ${correctedAnswers[3]}</li>
            <li>Triads: ${correctedAnswers[4]}</li>
            <li>Seventh Chords (notate): ${correctedAnswers[5]}</li>
            <li>Seventh Chords (identify): ${correctedAnswers[6]}</li>
            <li>2-5-1 Progressions: ${correctedAnswers[7]}</li>
            <li>Link to blues progression pdf: ${correctedAnswers[8]}</li>
            <li>
              <p>Blues progression backup chart:</p>
              <p>${correctedAnswers[9]}</p>
            </li>
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
          <Container maxWidth="lg">
            <SnackbarToast
              open={open}
              setOpen={setOpen}
              message={"You must select level before moving on."}
            />
            <Box mt={10} mb={5} textAlign="center">
              <Typography variant="h6" component="p" color="textSecondary">
                Please select your preferences below to start the test:
              </Typography>
            </Box>
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box p={4} boxShadow={4} borderRadius={4}>
                  <Typography variant="h5" mb={2}>
                    Select Your Clef Preference
                  </Typography>
                  <ClefPreferenceSelector clef={clef} setClef={setClef} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box p={4} boxShadow={4} borderRadius={4}>
                  <Typography variant="h5" mb={2}>
                    Select Your Class Preference
                  </Typography>
                  <ClassPreferenceSelector level={level} setLevel={setLevel} />
                </Box>
              </Grid>
            </Grid>
            <Box mt={10} textAlign="center">
              <Button
                variant="contained"
                size="large"
                onClick={handleStartTest(handleSubmit)}
                sx={{ padding: "16px 32px", borderRadius: 8 }}
              >
                <Typography variant="h5">Begin Test</Typography>
              </Button>
            </Box>
          </Container>
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE1 && (
          <KeySigNotate1
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={1}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE2 && (
          <KeySignaturesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={2}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE3 && (
          <KeySignaturesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={3}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_NOTATE4 && (
          <KeySignaturesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={4}
          />
        )}
        {viewState === VIEW_STATES.KEY_SIG_IDENTIFY && (
          <KeySigIdentify
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={5}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE1 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={6}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE2 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={7}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE3 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={8}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE4 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={9}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE5 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={10}
          />
        )}
        {viewState === VIEW_STATES.SCALES_NOTATE6 && (
          <ScalesNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={11}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE1 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={12}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE2 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={13}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE3 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={14}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE4 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={15}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE5 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={16}
          />
        )}
        {viewState === VIEW_STATES.TRIADS_NOTATE6 && (
          <TriadsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={17}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE1 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={18}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE2 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={19}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE3 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={20}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE4 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={21}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE5 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={22}
          />
        )}
        {viewState === VIEW_STATES.SEVENTH_CHORDS_NOTATE6 && (
          <SeventhChordsNotation
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={23}
          />
        )}
        {viewState === VIEW_STATES.CHORDS_IDENTIFY && (
          <ChordsIdentify
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={24}
          />
        )}
        {viewState === VIEW_STATES.WRITE_PROGRESSIONS && (
          <WriteProgressions
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            page={25}
          />
        )}
        {viewState === VIEW_STATES.WRITE_BLUES_CHANGES && (
          <WriteBluesChanges
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            nextViewState={incrementViewState}
            isPDFReady={isPDFReady}
            setIsPDFReady={setIsPDFReady}
            page={26}
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
            <Box sx={{ pl: 5 }}>
              {/* <Button onClick={incrementViewState}>
                <Typography variant="h4">{">"}</Typography>
              </Button>
              <Button onClick={() => setViewState(VIEW_STATES.TRIADS_NOTATE1)}>
                <Typography>{"Go to Triads"}</Typography>
              </Button>
              <Button
                onClick={() => setViewState(VIEW_STATES.WRITE_PROGRESSIONS)}
              >
                <Typography>{"Go to Progressions"}</Typography>
              </Button> */}
            </Box>
          )}
      </Stack>
    </Box>
  );
}
