import React from "react";
import Score from "../components/score";
import { Container } from "@mui/system";
const page = () => {
  return (
    <div className="text-center mt-[5m]">
      <Container maxWidth="lg">
        <Score
          staves={[
            ["a3", "d4", "e4", "d4"],
            ["a4", "d#4", "e4", "d4"],
            ["a4", "a#4", "b4", "a4"],
            ["f4", "e4", ["g3", "h"]],
            ["d4", "e#4", ["g3", "h"]],
            [["d4", 8], ["e4", 8], "e4", ["g3", "h"]],
            ["d4", "e#4", ["g3", "h"]],
            ["d4", "e4", ["g3", "h"]],
            ["d4", "e4", ["g3", "h"]],
          ]}
        />
      </Container>
    </div>
  );
};

export default page;
