import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";

// Configuration for email link. This is the URL that the student will be redirected to after clicking the link in their email.
const actionCodeSettings = {
  url: "https://lafsmw-backend--lafsmw-theory-test.us-central1.hosted.app/confirm",
  // url: "http://localhost:3000/confirm",
  handleCodeInApp: true,
};

export async function sendSignInEmail(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    alert("Verification email sent. Check your inbox.");
  } catch (err) {
    console.error("sendSignInLinkToEmail error:", err);
  }
}

export async function completeSignIn(email: string, link: string) {
  try {
    if (isSignInWithEmailLink(auth, link)) {
      const emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (!emailForSignIn) {
        throw new Error("Email not found in local storage.");
      }

      const result = await signInWithEmailLink(auth, emailForSignIn, link);
      window.localStorage.removeItem("emailForSignIn");

      if (result.user) {
        console.log(
          "Sign in successful! CurrentUser:",
          result.user.displayName
        );
        return true;
      }
    }
  } catch (err) {
    console.error("completeSignIn error:", err);
  }
}

export async function signOutOfApp() {
  return signOut(auth);
}

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

export async function resetPassword(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(`Password reset email sent to ${email}`);
    })
    .catch((err) => {
      console.error("sendPasswordResetEmail error:", err);
    });
}
