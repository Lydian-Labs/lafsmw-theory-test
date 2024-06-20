import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";

export async function signUp(
  email: string,
  password: string,
  displayName: string
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
      if (err.code === "auth/weak-password") {
        alert("Password should be at least 6 characters long");
      }
      if (err.code === "auth/invalid-email") {
        alert("Invalid email");
      }
      console.error("createUserWithEmailAndPassword error:", err);
    });

    if (auth.currentUser === null) throw new Error("User not created yet.");

    await updateProfile(auth.currentUser, { displayName: displayName }).catch(
      (err) => console.error("updateProfile error:", err)
    );
  } catch (err) {
    console.error("signUp error:", err);
  }
}

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.error("signInWithEmailAndPassword error:", err);
    });
    if (auth.currentUser !== null) {
      console.log(
        "Sign in successfull! CurrentUser:",
        auth.currentUser.displayName
      );
      return true;
    }
  } catch (err) {
    console.error("signIn error:", err);
  }
}

export async function signOutOfApp() {
  return signOut(auth);
}

export async function resetPassword(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(`Password reset email sent to ${email}`);
    })
    .catch((err) => {
      console.error("sendPasswordResetEmail error:", err);
    });
}
