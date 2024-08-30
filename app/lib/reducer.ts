import { StateInteraction, ActionType } from "./typesAndInterfaces";

export const reducer = (
  noteInteractionState: StateInteraction,
  action: ActionType
) => {
  const newNoteInteractionState = Object.keys(noteInteractionState).reduce(
    (acc, key) => {
      acc[key] = false;
      return acc;
    },
    {} as typeof noteInteractionState
  );

  if ("type" in action && action.type in newNoteInteractionState)
    newNoteInteractionState[action.type] = true;
  return newNoteInteractionState;
};
