"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import CreateAuthContext from "./createAuthContext";

type AuthContextType = {
  children: React.ReactNode;
};

// AuthContextProvider is a wrapper component that will provide the auth context to all its children
export default function AuthContextProvider({ children }: AuthContextType) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to listen for changes in the authentication state of the user. onAuthStateChanged() is a function that takes an auth instance and a callback function as arguments. The callback function is called whenever the authentication state of the user changes. The callback function is also called when the user first signs in, so we can use it to set the initial state of the user. It returns the unsubscribe function for the observer, so when the component unmounts, we'll call the unsubscribe function to stop listening for changes in the authentication state of the user, and prevent memory leaks.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // to enable the components to consume the values from this auth user context, we need to create an auth context provider to return a provider for the context we just created. The value prop will contain the data we want to make available to our component tree
  return (
    <CreateAuthContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </CreateAuthContext.Provider>
  );
}

// useAuthContext is a custom hook that allows us to use the auth context in our components - to access the current context value (consume the values from the auth user context)
export function useAuthContext() {
  const context = useContext(CreateAuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}
