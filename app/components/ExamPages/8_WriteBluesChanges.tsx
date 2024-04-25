"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import WriteBlues from "../WriteBlues";

export default function WriteBluesChanges({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const writeBluesFormRef = useRef<HTMLFormElement | null>(null);

  function handleBlues(input: InputData) {
    setCurrentUserData({ ...currentUserData, blues: input });
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="main"
        width={1250}
        height={800}
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
            width={1100}
            height={680}
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
                <Typography variant="subtitle1" marginBottom={2}>
                  Write the changes to a Bb blues using ii-V7-I in the last 4
                  measures (extra credit for hip reharms in the first 8
                  measures):
                </Typography>
              </Grid>
              <Grid item>
                <WriteBlues
                  handleBlues={handleBlues}
                  ref={writeBluesFormRef}
                  width={950}
                />
              </Grid>
            </Grid>
            <CardFooter
              width={900}
              height={100}
              pageNumber={8}
              handleSubmit={() => {
                writeBluesFormRef.current?.requestSubmit();
                nextViewState();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
