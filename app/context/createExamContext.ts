import { createContext } from "react";
import { initialFormInputState } from "../lib/initialStates";

const ExamContext = createContext(initialFormInputState);

export default ExamContext;
