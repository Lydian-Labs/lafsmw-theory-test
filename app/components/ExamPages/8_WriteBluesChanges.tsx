"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useAuthContext } from "@/firebase/authContext";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import WriteBlues from "../WriteBlues";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

export default function WriteBluesChanges({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const { user } = useAuthContext();
  const userName = user?.displayName?.split(" ").join("_");
  const writeBluesFormRef = useRef<HTMLFormElement | null>(null);

  function handleBlues(input: InputData) {
    setCurrentUserData({ ...currentUserData, blues: input });
  }

  const savePDF = () => {
    const capture = document.querySelector(".write-blues-changes");

    html2canvas(capture as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      const pdfBlob = pdf.output("blob");
      const storageRef = ref(storage, `${userName}-write-blues-changes.pdf`);

      uploadBytes(storageRef, pdfBlob)
        .then((snapshot) => {
          console.log("PDF uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading PDF: ", error);
        });
    });
  };

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
                  handleBlues={handleBlues}
                  ref={writeBluesFormRef}
                  width={1150}
                />
              </Grid>

              <Typography marginTop={4} align="left">
                *Note: this is a creative exercise. You do not have to fill out
                a chord for every beat.
              </Typography>
            </Grid>
            <CardFooter
              width={1100}
              height={100}
              pageNumber={16}
              handleSubmit={() => {
                writeBluesFormRef.current?.requestSubmit();
                savePDF();
                nextViewState();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
