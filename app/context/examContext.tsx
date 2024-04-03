"use client";
import { auth, db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { initialFormInputState } from "../lib/initialStates";
import { ExamContextType } from "../lib/typesAndInterfaces";
import ExamContext from "./createExamContext";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";

export default function ExamContextProvider({ children }: ExamContextType) {
  const [loading, setLoading] = useState(true);
  const userRef = auth.currentUser;
  const newFormInput = { ...initialFormInputState, user: userRef?.displayName };
  const [formInput, setFormInput] = useState<any>(newFormInput);
  // console.log("newFormInput in ExamContextProvider:", newFormInput);

  const user = auth.currentUser?.displayName;

  async function getUserSnapshot(currentUser: string) {
    try {
      const q = query(collection(db, currentUser));
      const querySnapshot = await getDocs(q);
      // console.log("querySnapshot in getUserSnapshot:", querySnapshot);

      const res = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFormInput(res[0]);
      console.log("formInput in getUserSnapshot after res:", formInput);
      return {
        success: true,
        message: `Successfully fetched ${currentUser} data`,
        res,
      };
    } catch (err) {
      return {
        success: false,
        message: `Error fetching ${currentUser} data: ${err}`,
      };
    }
  }

  useEffect(() => {
    getUserSnapshot(user);
    setLoading(false);
  }, []);

  // async function getUserSnapshot(currentUser: string | null | undefined) {
  //   try {
  //     const docRef = doc(db, `${currentUser}`, "formInput");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //       setFormInput(docSnap.data().formInput);
  //       // console.log(
  //       //   "formInput after getUserSnapshot docSnap data:",
  //       //   formInput
  //       // );
  //     } else {
  //       console.log("No such document! docSnap.data() is undefined");
  //     }
  //   } catch (err) {
  //     console.error("getUserSnapshot error:", err);
  //   }
  // }

  // function getAndSetUser() {
  //   console.log("user in getAndSetUser:", user);
  //   if (!user) {
  //     setUser(userRef?.displayName);
  //   }
  //   getUserSnapshot(user);
  // }

  // useEffect(() => {
  //   getUserSnapshot(userRef?.displayName);
  //   setLoading(false);
  // }, []);

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
    console.error("useExamContext error: context is undefined");
  }
  return context;
}
