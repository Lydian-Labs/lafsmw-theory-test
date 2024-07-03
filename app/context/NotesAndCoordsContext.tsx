"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { NotesAndCoordinatesData } from "../lib/typesAndInterfaces";
import { initialNotesAndCoordsState } from "../lib/initialStates";

const NotesAndCoordsContext = createContext<
  | {
      notesAndCoords: NotesAndCoordinatesData[];
      setNotesAndCoords: React.Dispatch<
        React.SetStateAction<NotesAndCoordinatesData[]>
      >;
    }
  | undefined
>(undefined);

type ClefProviderProps = {
  children: ReactNode;
};

export const ClefProvider = ({ children }: ClefProviderProps) => {
  const [notesAndCoords, setNotesAndCoords] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);

  return (
    <NotesAndCoordsContext.Provider
      value={{
        notesAndCoords: notesAndCoords,
        setNotesAndCoords: setNotesAndCoords,
      }}
    >
      {children}
    </NotesAndCoordsContext.Provider>
  );
};

export const useNotesAndCoords = () => {
  const context = useContext(NotesAndCoordsContext);
  if (context === undefined) {
    throw new Error("notesAndCoords must be within a NotesAndCoordsProvider");
  }
  return context;
};
