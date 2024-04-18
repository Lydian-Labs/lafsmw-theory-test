"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import WriteProgression from "../WriteProgression";

export default function ProgressionsWrite({
  currentUserData,
  setCurrentUserData,
}: UserDataProps) {
  const progressionsWriteFormRef = useRef<HTMLFormElement | null>(null);

  function handleProgressions(input: InputData) {
    setCurrentUserData({ ...currentUserData, progressions: input });
  }

  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={637}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        margin={"auto"}
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Stack gap={2}>
          <Typography variant="h5" marginLeft={8} marginY={1}>
            Section 7: Write Progressions
          </Typography>
          <Box
            width={1000}
            height={500}
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
                <Typography variant="h6">
                  Write ii-V-I Progressions in the following keys:
                </Typography>
              </Grid>
              <Grid item>
                <WriteProgression
                  handleProg={handleProgressions}
                  ref={progressionsWriteFormRef}
                  width={950}
                />
              </Grid>
            </Grid>
            <CardFooter
              width={900}
              height={100}
              pageNumber={6}
              handleSubmit={() => {
                progressionsWriteFormRef.current?.requestSubmit();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
