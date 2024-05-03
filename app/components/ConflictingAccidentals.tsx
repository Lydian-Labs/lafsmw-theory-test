import { Snackbar, Alert } from "@mui/material/";
import { ConflictingAccidentalProps } from "../lib/typesAndInterfaces";

const ConflictingAccidentals: React.FC<ConflictingAccidentalProps> = ({
  conflictingAccidental: conflictingAccidental,
  openEnterNotes: openEnterNotes,
}) => {
  return (
    <div>
      <Snackbar
        open={conflictingAccidental}
        autoHideDuration={3000}
        onClose={() => openEnterNotes({ type: "isEnterNoteActive" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity="error">
          {"Cannot add contradictory accidentals to the same note"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ConflictingAccidentals;
