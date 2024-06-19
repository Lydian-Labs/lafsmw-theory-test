"use client";
import { createContext, useState, useContext } from "react";


const ClefContext = createContext();

export const ClefProvider = ({ children }) => {
  const [clef, setClef] = useState("treble");

  return (
    <ClefContext.Provider value={{ clef, setClef }}>
      {children}
    </ClefContext.Provider>
  );
};

export const useClef = () => useContext(ClefContext);
