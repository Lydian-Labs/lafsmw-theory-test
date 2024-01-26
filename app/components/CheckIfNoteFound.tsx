import { Snackbar, Alert } from "@mui/material/";

interface CheckIfNoteFoundProps {
  noNoteFound: boolean;
  openEnterNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckIfNoteFound: React.FC<CheckIfNoteFoundProps> = ({
  noNoteFound: noNoteFound,
  openEnterNotes: openEnterNotes,
}) => {
  return (
    <div>
      <Snackbar
        open={noNoteFound}
        autoHideDuration={3000}
        onClose={() => openEnterNotes(true)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
     <Alert variant="filled" severity="error">
          {"The location you clicked doesn't correspond to a note"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckIfNoteFound;
