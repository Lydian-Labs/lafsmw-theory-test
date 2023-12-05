import React from "react";
import Score from "../components/score";
import { Container } from "@mui/system";
const page = () => {
  return (
    <div className="text-center mt-[5m]">
      <Container maxWidth="lg">
        <Score
          staves={[
            ["g#3", "d4", "e4", "d4"],
            ["a4", "d#4", "e4", "d4"],
            ["a4", "a#4", "b4", "a4"],
            ["f4", "e4", ["g3", 2]],
            ["d4", "e#4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e#4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
            ["d4", "e4", ["g3", 2]],
          ]}
        />
      </Container>
    </div>
  );
};

export default page;
