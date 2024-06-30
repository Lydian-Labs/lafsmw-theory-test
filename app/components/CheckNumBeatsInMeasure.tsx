import { Snackbar, Alert } from "@mui/material/";
import { CheckNumBeatsInMeasureProps } from "../lib/typesAndInterfaces";

const CheckNumBeatsInMeasure: React.FC<CheckNumBeatsInMeasureProps> = ({
  tooManyBeatsInMeasure,
  openEnterNotes: openEnterNotes,
}) => {
  return (
    <div>
      <Snackbar
        open={tooManyBeatsInMeasure}
        autoHideDuration={3000}
        onClose={() => openEnterNotes({ type: "isEnterNoteActive" })}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error">
          {"You only need to write 7 notes for the major scale. Do not repeat the 1st note an octave above."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckNumBeatsInMeasure;
