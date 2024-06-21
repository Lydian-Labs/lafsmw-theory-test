"use client";

import { createContext, useState, useContext, ReactNode } from "react";

const ClefContext = createContext<
  | {
      chosenClef: string;
      setChosenClef: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

type ClefProviderProps = {
  children: ReactNode;
};

export const ClefProvider = ({ children }: ClefProviderProps) => {
  const [chosenClef, setChosenClef] = useState<string>("treble");

  return (
    <ClefContext.Provider
      value={{ chosenClef: chosenClef, setChosenClef: setChosenClef }}
    >
      {children}
    </ClefContext.Provider>
  );
};

export const useClef = () => {
  const context = useContext(ClefContext);
  if (context === undefined) {
    throw new Error("useClef must be used within a ClefProvider");
  }
  return context;
};
