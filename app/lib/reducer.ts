import { StateType, Action } from "./typesAndInterfaces";

export const reducer = (state: StateType, action: Action) => {
  const newState = Object.keys(state).reduce((result, key) => {
    result[key] = false;
    return result;
  }, {} as StateType);

  if (action.type in newState) {
    newState[action.type] = true;
  }

  return newState;
};
