"use client";
import { chordTextInstructions } from "@/app/lib/data/instructions";
import { savePDF } from "@/app/lib/savePDF";
import { InputData, UserDataProps } from "@/app/lib/types";
import { useAuthContext } from "@/firebase/authContext";
import { Box, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import CardFooter from "../CardFooter";
import SnackbarToast from "../SnackbarToast";
import TutorialModal from "../TutorialModal";
import WriteBlues from "../WriteBlues";

export default function WriteBluesChanges({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const { user } = useAuthContext();
  const writeBluesFormRef = useRef<HTMLFormElement | null>(null);
  // Holds the most recent form submission so the save handler below can read
  // it synchronously without waiting for a re-render.
  const latestBluesRef = useRef<InputData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleBluesInput(input: InputData) {
    latestBluesRef.current = input;
    setCurrentUserData({ ...currentUserData, blues: input });
  }

  async function handleSaveAndContinue() {
    if (isSaving) return;
    if (!user?.uid) {
      setOpen(true);
      return;
    }
    setIsSaving(true);
    // requestSubmit fires the form's onSubmit synchronously, populating latestBluesRef
    writeBluesFormRef.current?.requestSubmit();
    try {
      const url = await savePDF(user.uid, user.displayName);
      await nextViewState({
        ...currentUserData,
        blues: latestBluesRef.current ?? currentUserData.blues,
        bluesUrl: url,
      });
    } catch (error) {
      console.error("Error saving blues PDF:", error);
      setOpen(true);
      setIsSaving(false);
    }
  }

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    maxWidth: "1400px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 8: Write Blues Chord Changes
        </Typography>
        <TutorialModal tutorialInstructions={chordTextInstructions} />
      </Box>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        autoHideDuration={6000}
        message={
          "We couldn't save your PDF. Please check your connection and try again."
        }
      />
      <Box
        component="main"
        width={1400}
        height={800}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Stack spacing={4} p={2}>
          <Box
            className="write-blues-changes"
            width={1300}
            height={730}
            bgcolor={"card.background"}
            borderRadius="var(--borderRadius)"
            margin={"auto"}
            boxShadow="var(--cardShadow)"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              direction="column"
              alignItems={"center"}
              spacing={2}
              sx={{ p: 3 }}
            >
              <Typography variant="h6">
                Write the changes to a Bb blues using 2-5-1 in the last 4
                measures (extra credit for hip reharms):
              </Typography>
              <WriteBlues
                handleInput={handleBluesInput}
                currentData={currentUserData.blues}
                ref={writeBluesFormRef}
                width={1150}
              />

              <Typography marginTop={2} align="left">
                *Note: You can enter 1 to 4 chords per bar. Your chord chart
                will be saved as a PDF when you continue.
              </Typography>
            </Stack>
            <CardFooter
              width={1100}
              pageNumber={page}
              buttonText={isSaving ? "Saving..." : "Save PDF & Continue >"}
              buttonType="button"
              disabled={isSaving}
              handleSubmit={handleSaveAndContinue}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
