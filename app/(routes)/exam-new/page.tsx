"use client";
import {
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ClassPreferenceSelector from "../../components/ClassPreferenceSelector";

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

export default function ExamNew() {
  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={637}
        bgcolor={"button.pressed"}
        borderRadius="var(--borderRadius)"
        py={3}
        px={12}
      >
        <Grid container>
          <Grid item xs={4}>
            <Stack gap={2}>
              <Typography variant="h5" align="center">
                Section 1: Key Signatures
              </Typography>
              <ClassPreferenceSelector></ClassPreferenceSelector>
              <Box
                width={273}
                height={456}
                bgcolor={"background.card"}
                borderRadius="var(--borderRadius)"
              >
                <Stack mx={3}>
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
          <Grid
            item
            xs={8}
            sx={{ flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Box>
              <Box
                width={569}
                height={540}
                bgcolor={"background.card"}
                borderRadius="var(--borderRadius)"
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
