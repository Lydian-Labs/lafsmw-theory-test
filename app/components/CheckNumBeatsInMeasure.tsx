import { Snackbar, Alert } from "@mui/material/";

interface CheckNumBeatsInMeasureProps {
  tooManyBeatsInMeasure: boolean;
  setTooManyBeatsInMeasure: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckNumBeatsInMeasure: React.FC<CheckNumBeatsInMeasureProps> = ({
  tooManyBeatsInMeasure,
  setTooManyBeatsInMeasure,
}) => {
  return (
    <div>
      <Snackbar
        open={tooManyBeatsInMeasure}
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
