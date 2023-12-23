import Vex from "vexflow";
import { useState } from "react";
const { StaveNote } = Vex.Flow;
import { Snackbar, Alert } from "@mui/material/";

const CheckNumBeatsInMeasure = (
  timeSig: string,
  noteArray: InstanceType<typeof StaveNote>[]
) => {
  const [tooManyNotesInMeasure, setTooManyBeatsInMeasure] = useState(false);
  const beatsInMeasure = timeSig ? parseInt(timeSig.split("/")[0]) : 0;
  if (noteArray.length > beatsInMeasure) {
    setTooManyBeatsInMeasure(true);
  }

  return (
    <div>
      <Snackbar
        open={tooManyNotesInMeasure}
        autoHideDuration={4000}
        onClose={() => setTooManyBeatsInMeasure(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error">
          {"You've entered too many beats in this measure"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckNumBeatsInMeasure;
