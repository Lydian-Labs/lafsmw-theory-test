import {
  ChordInteractionAction,
  ChordInteractionState,
  KeySigAction,
  KeySigState,
  NoteInteractionAction,
  NoteInteractionState,
} from "./typesAndInterfaces";

export const reducer = (
  state: ChordInteractionState | NoteInteractionState | KeySigState,
  action: NoteInteractionAction | KeySigAction | ChordInteractionAction
) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as typeof state);

  if ("type" in action && action.type in newState) newState[action.type] = true;
  return newState;
};
export const chordReducer = (
  state: ChordInteractionState,
  action: ChordInteractionAction
) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as typeof state);

  if ("type" in action && action.type in newState) newState[action.type] = true;
  return newState;
};
