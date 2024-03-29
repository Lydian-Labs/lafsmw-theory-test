import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export async function signUp(email, password, displayName) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log("createUserWithEmailAndPassword error:", err)
    );
    await updateProfile(auth.currentUser, { displayName: displayName }).catch(
      (err) => console.log("updateProfile error:", err)
    );
    console.log("currentUser:", auth.currentUser);
  } catch (err) {
    console.log("signUp error:", err);
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.log("signInWithEmailAndPassword error:", err);
    });
    console.log("currentUser:", auth.currentUser);
  } catch (err) {
    console.log("signIn error:", err);
  }
}

export async function signOutOfApp() {
  return signOut(auth);
}
