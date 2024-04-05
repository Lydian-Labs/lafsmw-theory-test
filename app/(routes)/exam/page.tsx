"use client";
import KeySigNote from "@/app/components/ExamQuestions/1KeySigNote";
import KeySigText from "@/app/components/ExamQuestions/2KeySigText";
import WriteChords from "@/app/components/ExamQuestions/3WriteChords";
import { MouseEvent, InputState } from "@/app/lib/typesAndInterfaces";

import { useAuthContext } from "@/firebase/authContext";
import {
  getUserSnapshot,
  setOrUpdateStudentData,
} from "@/firebase/firestore/model";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initialFormInputState } from "@/app/lib/initialStates";

export default function ExamHomePage() {
  const { user } = useAuthContext();
  const userName = user?.displayName;
  const userId = user?.uid;
  const initialState = {
    ...initialFormInputState,
    user: userName,
    userId: userId,
  };
  // console.log("user name and ID in ExamHomePage:", userName, userId);

  const router = useRouter();

  const VIEW_STATES = { KEY_SIG_NOTE: 1, KEY_SIG_TEXT: 2, WRITE_SCALES: 3 };
  const [viewState, setViewState] = useState(VIEW_STATES.KEY_SIG_NOTE);

  const [currentUserData, setCurrentUserData] =
    useState<InputState>(initialState);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          let inputRes = { ...currentUserData, ...res[0] };
          // console.log("inputRes:", inputRes);
          setCurrentUserData(inputRes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user == null) {
      return router.push("/registration");
    } else {
      fetchSnapshot();
    }
  }, [router, user]);

  console.log("currentUserData after useEffect:", currentUserData);

  const incrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.WRITE_SCALES) {
        return VIEW_STATES.KEY_SIG_NOTE;
      } else {
        return prevState + 1;
      }
    });
  };

  const decrementViewState = () => {
    setViewState((prevState) => {
      if (prevState === VIEW_STATES.KEY_SIG_NOTE) {
        return VIEW_STATES.WRITE_SCALES;
      } else {
        return prevState - 1;
      }
    });
  };

  const handleFinalSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (!userName) {
        throw new Error("No current user found.");
      }
      await setOrUpdateStudentData(currentUserData, userName);
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  return (
    <div>
      {viewState === VIEW_STATES.KEY_SIG_NOTE && (
        <KeySigNote
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.KEY_SIG_TEXT && (
        <KeySigText
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      {viewState === VIEW_STATES.WRITE_SCALES && (
        <WriteChords
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )}
      <Stack
        direction={"row"}
        sx={{ display: "flex", justifyContent: "space-around" }}
        p={4}
      >
        <Button onClick={decrementViewState}>{"< Previous"}</Button>
        <Button onClick={incrementViewState}>{"Next >"}</Button>
        <Button onClick={handleFinalSubmit}>Submit to db</Button>
      </Stack>
    </div>
  );
}
