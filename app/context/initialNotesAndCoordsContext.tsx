"use client";

import { createContext, useState, useContext, ReactNode } from "react";

const InitialRunContext = createContext({
  initialRun: true,
  setInitialRun: (value: boolean): void => {},
});

type InitialRunProviderProps = {
  children: ReactNode;
};

export const InitialRunProvider = ({ children }: InitialRunProviderProps) => {
  const [initialRun, setInitialRun] = useState<boolean>(true);

  return (
    <InitialRunContext.Provider
      value={{
        initialRun,
        setInitialRun,
      }}
    >
      {children}
    </InitialRunContext.Provider>
  );
};

export const useInitialRun = () => {
  const context = useContext(InitialRunContext);
  if (context === undefined) {
    throw new Error("initialRun must be within a initialRunProvider");
  }
  return context;
};
