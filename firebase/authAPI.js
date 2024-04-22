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
      console.error("createUserWithEmailAndPassword error:", err)
    );
    await updateProfile(auth.currentUser, { displayName: displayName }).catch(
      (err) => console.error("updateProfile error:", err)
    );
    console.log("Sign in successfull! CurrentUser:", auth.currentUser);
  } catch (err) {
    console.error("signUp error:", err);
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.error("signInWithEmailAndPassword error:", err);
    });
    console.log("Sign in successfull! CurrentUser:", auth.currentUser);
  } catch (err) {
    console.error("signIn error:", err);
  }
}

export async function signOutOfApp() {
  return signOut(auth);
}
