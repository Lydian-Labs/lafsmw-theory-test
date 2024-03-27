"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { createUser } from "@/firebase/firestore/model";

import Staff from "@/app/components/Staff";

import FormInput from "@/app/components/FormInput";
import ProgressBar from "@/app/components/ProgressBar";
import { useState } from "react";
import { useExamContext } from "@/app/context/examContext";

const instructions = [
  {
    instructionTitle: "Select the accidental:",
    instructionText:
      "Choose the flat (b) or sharp (#) button to select the type of accidental you need to add.",
  },
  {
    instructionTitle: "Place it on the staff:",
    instructionText:
      "After selecting the accidental, click on the exact line or space on the staff where the accidental belongs.",
  },
  {
    instructionTitle: "Erase a note or accidental:",
    instructionText:
      "If you need to erase a note or an accidental, first select the “Eraser” button, then click on the note or accidental you wish to erase.",
  },
  {
    instructionTitle: "Clear a measure:",
    instructionText:
      "If you wish to clear an entire measure, select the “Clear Measure” button and the contents of the measure will be erased.",
  },
];

export default function KeySignaturesText() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");

  const formInput = useExamContext();

  console.log("formInput", formInput);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await createUser(first, second, third, fourth);
    if (added) {
      setFirst("");
      setSecond("");
      setThird("");
      setFourth("");
      alert("User added successfully");
    }
  };

  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={637}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        m={"auto"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} m={"auto"} p={0}>
          <Grid item xs={4}>
            <Stack gap={2} alignItems={"center"}>
              <Typography variant="h5" align="center">
                Section 2: Identify Key Signatures
              </Typography>
              <Box
                width={273}
                height={456}
                bgcolor={"card.background"}
                borderRadius="var(--borderRadius)"
                boxShadow={
                  "0px 13px 28px 0px rgba(0, 0, 0, 0.10), 0px 50px 50px 0px rgba(0, 0, 0, 0.09), 0px 113px 68px 0px rgba(0, 0, 0, 0.05), 0px 201px 80px 0px rgba(0, 0, 0, 0.01), 0px 314px 88px 0px rgba(0, 0, 0, 0.00)"
                }
              >
                <Stack mx={3} p={1}>
                  <Typography variant="h6" align="center">
                    Tutorial
                  </Typography>
                  <List>
                    {instructions.map((value, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText
                          primary={`${index + 1}. ${value.instructionTitle}`}
                          secondary={value.instructionText}
                          primaryTypographyProps={{ fontSize: "11px" }}
                          secondaryTypographyProps={{ fontSize: "11px" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={8} margin={"auto"}>
            <Box
              width={569}
              height={540}
              bgcolor={"card.background"}
              borderRadius="var(--borderRadius)"
              margin={"auto"}
              boxShadow={
                "0px 13px 28px 0px rgba(0, 0, 0, 0.10), 0px 50px 50px 0px rgba(0, 0, 0, 0.09), 0px 113px 68px 0px rgba(0, 0, 0, 0.05), 0px 201px 80px 0px rgba(0, 0, 0, 0.01), 0px 314px 88px 0px rgba(0, 0, 0, 0.00)"
              }
            >
              <Grid container columns={1} direction="column" p={4} spacing={2}>
                <Grid item>
                  <Typography variant="h6" align="center">
                    Identify the following key signatures:
                  </Typography>
                </Grid>
                <Grid item>
                  <Staff
                    addDoubleBarLine={true}
                    width={500}
                    noTimeSignature={true}
                    numBars={4}
                  />
                </Grid>
                <Grid item>
                  <form onSubmit={handleSubmit}>
                    <Stack direction={"row"} spacing={4}>
                      <FormInput
                        name={"input1"}
                        type={"text"}
                        value={first}
                        width={"70px"}
                        onChange={(e) => setFirst(e.target.value)}
                        required={false}
                      />
                      <FormInput
                        name={"input2"}
                        type={"text"}
                        value={second}
                        width={"70px"}
                        onChange={(e) => setSecond(e.target.value)}
                        required={false}
                      />
                      <FormInput
                        name={"input3"}
                        type={"text"}
                        value={third}
                        width={"70px"}
                        onChange={(e) => setThird(e.target.value)}
                        required={false}
                      />
                      <FormInput
                        name={"input4"}
                        type={"text"}
                        value={fourth}
                        width={"70px"}
                        onChange={(e) => setFourth(e.target.value)}
                        required={false}
                      />
                    </Stack>
                    <Button type="submit">Submit</Button>
                    {/* <button type="submit">Submit</button> */}
                  </form>
                </Grid>
                <Grid item>
                  <Divider sx={{ paddingY: "16px", marginBottom: "12px" }} />
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="center" spacing={8}>
                    <Stack gap={2}>
                      <Typography variant="body1">Question 1/45</Typography>
                      <ProgressBar value={4} />
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{ height: "33px", marginTop: "8px" }}
                    >
                      {"Next Question >"}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
