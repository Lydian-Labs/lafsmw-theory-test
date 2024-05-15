// components/CountdownTimer.js
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface CountdownTimerProps {
  duration: number;
  onTimeUp: () => void;
}

const CountdownTimer = ({ duration, onTimeUp }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Box className="bg-[#a0a0a0] px-4 ml-16 rounded-full text-center w-fit">
      <Typography variant="caption">
        Time Left: {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
