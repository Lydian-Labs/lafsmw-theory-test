import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar({ value }) {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={value}
        sx={{
          backgroundColor: "progressBar.unfilled",
          height: "13px",
          width: "216px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      />
    </div>
  );
}
