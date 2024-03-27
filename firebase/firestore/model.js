import {
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";

export async function createUser(first, second, third, fourth) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: first,
      second: second,
      third: third,
      fourth: fourth,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function postData(payload) {
  try {
    const location = collection(db, "users");

    return setDoc(doc(location), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function addData(collection, id, data) {
  try {
    // this doc creates the reference to the document - i.e. where is it?
    // collection could be "lr" or "messages" in this example, or it could be a path to a subcollection, like "lr/album1"
    const docRef = doc(db, collection, id);
    // setDoc is the mutation function that actually adds the data to the database - let me update the server
    // on the Frontend masters video, he says await is not needed here and it could be actually worse to use it. The purpose of await is to wait for the response from the server, but if you don't need the response, then you don't need await. Firestore autmatically handles the response from the server, so you don't need to wait for it.
    // also note that setDoc adds data destructively - i.e. it will overwrite any existing data at that location
    const result = await setDoc(docRef, data, {
      merge: true,
    });
    return { result, error: null };
  } catch (error) {
    console.error("addData error:", error);
    return { result: null, error: error.message };
  }
}
