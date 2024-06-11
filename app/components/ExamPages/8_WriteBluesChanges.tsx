"use client";
import { savePDF } from "@/app/lib/savePDF";
import { InputData, UserDataBluesProps } from "@/app/lib/typesAndInterfaces";
import { useAuthContext } from "@/firebase/authContext";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import CardFooter from "../CardFooter";
import WriteBlues from "../WriteBlues";
import SnackbarToast from "../SnackbarToast";

export default function WriteBluesChanges({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  isPDFReady,
  setIsPDFReady,
}: UserDataBluesProps) {
  const { user } = useAuthContext();
  const userName = user?.displayName?.split(" ").join("_");
  const writeBluesFormRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  function handleBluesInput(input: InputData) {
    setCurrentUserData({ ...currentUserData, blues: input });
  }

  async function handlePDF() {
    if (!isPDFReady) {
      setIsPDFReady(true);
    }
    savePDF(userName, setCurrentUserData, currentUserData);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must save the PDF before moving on."}
      />
      <Box
        component="main"
        width={1450}
        height={930}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Stack gap={2}>
          <Typography variant="h6" marginLeft={8}>
            Section 8: Write Blues Chord Changes
          </Typography>
          <Box
            className="write-blues-changes"
            width={1300}
            height={800}
            bgcolor={"card.background"}
            borderRadius="var(--borderRadius)"
            margin={"auto"}
            boxShadow="var(--cardShadow)"
          >
            <Grid
              container
              columns={1}
              direction="column"
              alignItems={"center"}
              marginY={"auto"}
              p={3}
              spacing={2}
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Write the changes to a Bb blues using ii-V7-I in the last 4
                  measures (extra credit for hip reharms):
                </Typography>
              </Grid>
              <Grid item>
                <WriteBlues
                  handleInput={handleBluesInput}
                  currentData={currentUserData.blues}
                  ref={writeBluesFormRef}
                  width={1150}
                />
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Typography marginTop={2} align="left">
                    *Note: You can enter 1 to 4 chords per bar. You
                    <b> MUST</b> press <em>Save PDF </em>before moving on.
                  </Typography>
                  <Button onClick={handlePDF}>Save PDF</Button>
                </Stack>
              </Grid>
            </Grid>
            <CardFooter
              width={1100}
              pageNumber={21}
              buttonText="Continue >"
              buttonForm="submit-form-blues"
              handleSubmit={() => {
                if (!isPDFReady) {
                  setOpen(true);
                } else {
                  writeBluesFormRef.current?.requestSubmit();
                  nextViewState();
                }
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
