"use client";
import { savePDF } from "@/app/lib/savePDF";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useAuthContext } from "@/firebase/authContext";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import WriteBlues from "../WriteBlues";

export default function WriteBluesChanges({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  updateAnswers,
}: UserDataProps) {
  const { user } = useAuthContext();
  const userName = user?.displayName?.split(" ").join("_");
  const writeBluesFormRef = useRef<HTMLFormElement | null>(null);

  function handleBlues(input: InputData) {
    // handleBlues is logging the data just fine here so WriteBlues is working
    console.log("input from handleBlues: ", input);
    // but currentUserData is not updating. Need to figure out why
    setCurrentUserData({ ...currentUserData, blues: input });
    // when you put a console.log here, it doesn't show you the updated currentUserData - js thing I don't understand
    // so the data does move on from here when savePDF is commented out
  }

  function handlePDF() {
    savePDF(userName, setCurrentUserData, currentUserData);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="main"
        width={1450}
        height={850}
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
            height={720}
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
                  measures (extra credit for hip reharms in the first 8
                  measures):
                </Typography>
              </Grid>
              <Grid item>
                <WriteBlues
                  handleInput={handleBlues}
                  currentData={currentUserData.blues}
                  ref={writeBluesFormRef}
                  width={1150}
                />
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Typography marginTop={2} align="left">
                    {`*Note: this is a creative exercise. Only write 1-3 chords per bar. You must press "Save PDF" before moving on.`}
                  </Typography>
                  <Button onClick={handlePDF}>Save PDF</Button>
                </Stack>
              </Grid>
            </Grid>
            <CardFooter
              width={1100}
              height={100}
              pageNumber={16}
              buttonText="Continue >"
              handleSubmit={() => {
                writeBluesFormRef.current?.requestSubmit();
                updateAnswers();
                nextViewState();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
