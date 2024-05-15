"use client";
import { useState } from "react";

const useLayoutState = () => {
  const [state, setState] = useState({});

  return {
    state,
    setState,
  };
};

export default useLayoutState;
