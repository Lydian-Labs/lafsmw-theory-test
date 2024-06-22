"use client";
import { scalesNotationInstructions } from "@/app/lib/data/instructions";
import scalesText from "@/app/lib/data/scalesText";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import CardFooter from "../CardFooter";
import NotateScale from "../NotateScale";
import SnackbarToast from "../SnackbarToast";
import TutorialCard from "../TutorialCard";

export default function ScalesNotation({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const [scales, setScales] = useState<Array<string>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const scalesPropName = `scales${page - 5}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setOpen(true);
      return;
    } else {
      setCurrentUserData({
        ...currentUserData,
        [scalesPropName]: scales,
      });
      nextViewState();
    }
  };

  return (
    <Container>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must press Save before moving on."}
      />
      <Box
        component="main"
        width={1139}
        height={610}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
          <Grid item xs={4}>
            <TutorialCard
              tutorialInstructions={scalesNotationInstructions}
              firstPage={page === 6}
              title={"Section 3: Notate Scales"}
            />
          </Grid>
          <Grid item xs={8} margin={"auto"}>
            <Box
              width={569}
              height={540}
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
                p={2}
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h6">
                    {`Write the following scale: ${scalesText[page - 6]}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateScale
                    setScales={setScales}
                    setIsReady={setIsReady}
                    isReady={isReady}
                  />
                </Grid>
              </Grid>
              <CardFooter
                buttonText={"Continue >"}
                pageNumber={page}
                handleSubmit={handleSubmit}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
