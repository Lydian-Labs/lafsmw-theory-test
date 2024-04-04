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

import FormInput from "@/app/components/FormInput";
import ProgressBar from "@/app/components/ProgressBar";
import Staff from "@/app/components/Staff";
import { instructions } from "@/app/lib/instructions";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { SetStateAction, useState } from "react";

export default function KeySignaturesText({
  currentUserData,
  setCurrentUserData,
}: UserDataProps) {
  const [keySigText, setKeySigText] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const handleInputChange = (e: {
    target: {
      name: string;
      value: SetStateAction<string>;
    };
  }) => {
    setKeySigText({ ...keySigText, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...currentUserData,
      keySignatures: keySigText,
    };
    setCurrentUserData(payload);
  };

  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={637}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
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
                boxShadow="var(--cardShadow)"
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
              boxShadow="var(--cardShadow)"
            >
              <Grid
                container
                columns={1}
                direction="column"
                alignItems={"center"}
                marginY={"auto"}
                p={4}
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h6">
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
                  <form onSubmit={handleSubmit} id="keySigs">
                    <Stack direction={"row"} spacing={4}>
                      <FormInput
                        name={"input1"}
                        value={keySigText.input1}
                        width={"70px"}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        name={"input2"}
                        value={keySigText.input2}
                        width={"70px"}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        name={"input3"}
                        value={keySigText.input3}
                        width={"70px"}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        name={"input4"}
                        value={keySigText.input4}
                        width={"70px"}
                        onChange={handleInputChange}
                      />
                    </Stack>
                  </form>
                </Grid>
                <Grid item>
                  <Divider sx={{ paddingY: "16px", marginBottom: "12px" }} />
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="center" spacing={8}>
                    <Stack gap={2}>
                      <Typography variant="body1">Question 2/45</Typography>
                      <ProgressBar value={4} />
                    </Stack>
                    <Button
                      variant="contained"
                      type="submit"
                      form="keySigs"
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