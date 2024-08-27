import { StateInteraction, ActionType } from "./typesAndInterfaces";

export const reducer = (state: StateInteraction, action: ActionType) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as typeof state);

  if ("type" in action && action.type in newState) newState[action.type] = true;
  return newState;
};
