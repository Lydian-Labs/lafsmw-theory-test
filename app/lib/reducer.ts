import {
  StateInteraction,
  InteractionActionTypes,
  NoteInteractionState,
} from "./typesAndInterfaces";

interface Action {
  type: InteractionActionTypes;
}

export const reducer = (
  noteInteractionState: StateInteraction,
  action: Action
) => {
  if (action.type === "CLEAR_ALL") {
    return Object.keys(noteInteractionState).reduce((state, key) => {
      state[key] = false;
      return state;
    }, {} as NoteInteractionState);
  }
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
