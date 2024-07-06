"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import WriteProgression from "../WriteProgression";
import TutorialModal from "../TutorialModal";
import { chordTextInstructions } from "@/app/lib/data/instructions";

export default function WriteProgressions({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const writeProgressionsFormRef = useRef<HTMLFormElement | null>(null);

  function handleProgressions(input: InputData) {
    setCurrentUserData({ ...currentUserData, progressions: input });
  }

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Container>
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 7: Write Progressions
        </Typography>
        <TutorialModal tutorialInstructions={chordTextInstructions} />
      </Box>
      <Box
        component="main"
        width={1139}
        height={710}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={1000}
              height={640}
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
                  <Typography variant="h6" marginBottom={2}>
                    Write 2-5-1 Progressions in the following keys:
                  </Typography>
                </Grid>
                <Grid item>
                  <WriteProgression
                    handleInput={handleProgressions}
                    currentData={currentUserData.progressions}
                    ref={writeProgressionsFormRef}
                    width={950}
                  />
                </Grid>
              </Grid>
              <CardFooter
                width={900}
                height={100}
                pageNumber={page}
                handleSubmit={() => {
                  writeProgressionsFormRef.current?.requestSubmit();
                  nextViewState();
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
