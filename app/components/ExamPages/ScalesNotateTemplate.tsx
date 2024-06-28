"use client";
import { scalesNotationInstructions } from "@/app/lib/data/instructions";
import scalesText from "@/app/lib/data/scalesText";
import {
  FormEvent,
  UserDataProps,
  ScaleData,
  StaveType,
} from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardFooter from "../CardFooter";
import NotateScale from "../NotateScale";
import SnackbarToast from "../SnackbarToast";
import TutorialModal from "../TutorialModal";

export default function ScalesNotation({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const [scales, setScales] = useState<Array<string>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scaleDataMatrix, setScaleDataMatrix] = useState<ScaleData[][]>(
    currentUserData[`scaleDataMatrix${page - 5}`] || [[]]
  );
  const [scaleStaves, setScaleStaves] = useState<StaveType[]>(
    currentUserData[`scaleStaves${page - 5}`] || []
  );
  const scalesPropName = `scales${page - 5}`;
  const scaleDataMatrixPropName = `scaleDataMatrix${page - 5}`;
  const stavesPropName = `scaleStaves${page - 5}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setOpen(true);
      return;
    } else {
      setCurrentUserData({
        ...currentUserData,
        [scalesPropName]: scales,
        [scaleDataMatrixPropName]: scaleDataMatrix,
        [stavesPropName]: scaleStaves,
      });
      nextViewState();
    }
  };

  useEffect(() => {
    console.log(currentUserData);
  }, [currentUserData]);

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Container>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must press Save before moving on."}
      />
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 3: Notate Scales
        </Typography>
        <TutorialModal tutorialInstructions={scalesNotationInstructions} />
      </Box>
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
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={750}
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
                    scales={scales}
                    setScales={setScales}
                    scaleDataMatrix={scaleDataMatrix}
                    setScaleDataMatrix={setScaleDataMatrix}
                    scaleStaves={scaleStaves}
                    setScaleStaves={setScaleStaves}
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
