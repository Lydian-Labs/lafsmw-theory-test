import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export async function signUp(email, password, displayName) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);

    console.log("auth.currentUser:", auth.currentUser);

    if (displayName) {
      const user = auth.currentUser;
      user.displayName = displayName;
    }
  } catch (e) {
    error = e;
    console.log("signup error:", e);
  }
  return { result, error };
}

export async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signOutOfApp() {
  return signOut(auth);
}
