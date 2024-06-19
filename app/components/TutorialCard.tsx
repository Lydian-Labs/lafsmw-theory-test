import {
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type TutorialInstructions = {
  instructionTitle: string;
  instructionText: string;
};

interface TutorialCardProps {
  tutorialInstructions: TutorialInstructions[];
  firstPage: boolean;
  title: string;
  height?: number;
}

export default function TutorialCard({
  tutorialInstructions,
  firstPage,
  title,
  height = 456,
}: TutorialCardProps) {
  return (
    <Stack gap={2} alignItems={"center"}>
      {firstPage && (
        <Typography variant="h6" align="center">
          {title}
        </Typography>
      )}
      <Box
        width={273}
        height={height}
        bgcolor={"card.background"}
        borderRadius="var(--borderRadius)"
        boxShadow="var(--cardShadow)"
      >
        <Stack mx={3} p={1}>
          <Typography variant="h6" align="center">
            Tutorial
          </Typography>
          <List>
            {tutorialInstructions.map((value, index) => (
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
  );
}
