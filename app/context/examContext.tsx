"use client";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { initialFormInputState } from "../lib/initialStates";
import { ExamContextType } from "../lib/typesAndInterfaces";
import ExamContext from "./createExamContext";

export default function ExamContextProvider({ children }: ExamContextType) {
  const userRef = auth.currentUser;
  const newFormInput = { ...initialFormInputState, user: userRef?.displayName };
  const [formInput, setFormInput] = useState<any>(newFormInput);
  console.log("newFormInput in ExamContextProvider:", newFormInput);

  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<null | any>(userRef?.displayName);

  async function getUsersSnapshot(currentUser: string | null | undefined) {
    try {
      const docRef = doc(db, `${currentUser}`, "formInput");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormInput(docSnap.data().formInput);
        console.log(
          "formInput after getUsersSnapshot docSnap data:",
          formInput
        );
      } else {
        console.log("No such document! docSnap.data() is undefined");
      }
    } catch (err) {
      console.error("getUsersSnapshot error:", err);
    }
  }

  // function getAndSetUser() {
  //   console.log("user in getAndSetUser:", user);
  //   if (!user) {
  //     setUser(userRef?.displayName);
  //   }
  //   getUsersSnapshot(user);
  // }

  useEffect(() => {
    getUsersSnapshot(userRef?.displayName);
    setLoading(false);
  }, []);

  return (
    <ExamContext.Provider value={formInput}>
      {loading ? <div>Loading...</div> : children}
    </ExamContext.Provider>
  );
}

// useExamContext is a custom hook that allows us to use the Exam context in our components - to access the current context value (consume the values from the Exam user context)
export function useExamContext() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error(
      "useExamContext must be used within an ExamContextProvider"
    );
  }
  return context;
}
