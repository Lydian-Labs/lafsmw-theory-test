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

import { setKeySigData } from "@/firebase/firestore/model";

import Staff from "@/app/components/Staff";

import FormInput from "@/app/components/FormInput";
import ProgressBar from "@/app/components/ProgressBar";
import { useExamContext } from "@/app/context/examContext";
import { instructions } from "@/app/lib/instructions";
import { FormEvent } from "@/app/lib/typesAndInterfaces";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

export default function KeySignaturesText() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");

  const router = useRouter();

  const examValues = useExamContext();
  const { user } = examValues;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const added = await setKeySigData(first, second, third, fourth, user);
    if (added) {
      router.push("/exam/write-scales");
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
                        value={first}
                        width={"70px"}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => setFirst(e.target.value)}
                      />
                      <FormInput
                        name={"input2"}
                        value={second}
                        width={"70px"}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => setSecond(e.target.value)}
                      />
                      <FormInput
                        name={"input3"}
                        value={third}
                        width={"70px"}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => setThird(e.target.value)}
                      />
                      <FormInput
                        name={"input4"}
                        value={fourth}
                        width={"70px"}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => setFourth(e.target.value)}
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
