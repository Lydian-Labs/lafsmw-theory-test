import { Container } from "@mui/system";
import Score from "../components/score";
const renderNotes = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Score
          staves={[
            ["g3", "d4", "e4", "d4"],
            ["a4", "d4", "e4", "d4"],
            ["a4", "a4", "b4", "a4"],
            ["f4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
          ]}
        />
      </Container>
    </div>
  );
};

export default renderNotes;
