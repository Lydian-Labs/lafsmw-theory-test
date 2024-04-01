"use client";
import React, { use, useContext, useEffect, useState } from "react";
import ExamContext from "./createExamContext";
import { ExamContextType, InputState } from "../lib/typesAndInterfaces";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { initialFormInputState } from "../lib/initialStates";

export default function ExamContextProvider({ children }: ExamContextType) {
  const [formInput, setFormInput] = useState<any>(initialFormInputState);
  const userRef = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | any>(userRef?.displayName);

  async function getUsersSnapshot(currentUser: string) {
    try {
      const docRef = doc(db, `${currentUser}`, "formInput");
      const docSnap = await getDoc(docRef);
      // console.log(
      //   "docSnap.data().formInput in getUsersSnapshot:",
      //   docSnap.data()?.formInput
      // );

      if (docSnap.exists()) {
        // console.log("Document data from examContext:", docSnap.data());
        setFormInput(docSnap.data().formInput);
        console.log("formInput after getUsersSnapshot:", formInput);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.error("getDataFromUser error:", err);
    }
  }
  // async function getUsersSnapshot() {
  //   const q = query(collection(db, "users"));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

  async function getAndSetUser() {
    if (!user) {
      setUser(userRef?.displayName);
    }
    getUsersSnapshot(user);
    // setFormInput({
    //   ...formInput,
    //   user: userRef?.displayName,
    //   blues: { beginner: "1", intermediate: "1", advanced: "1" }
    // });
  }

  useEffect(() => {
    getAndSetUser();
    // getUsersSnapshot(user);
    console.log("formInput after examContext useEffect:", formInput);
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
