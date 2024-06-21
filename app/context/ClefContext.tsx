"use client"

import { createContext, useState, useContext, ReactNode } from "react";

const ClefContext = createContext<
  | { clef: string; setClef: React.Dispatch<React.SetStateAction<string>> }
  | undefined
>(undefined);

type ClefProviderProps = {
  children: ReactNode;
};

export const ClefProvider = ({ children }: ClefProviderProps) => {
  const [clef, setClef] = useState<string>("treble");

  return (
    <ClefContext.Provider value={{ clef, setClef }}>
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
