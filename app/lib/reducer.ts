import {
  ChordInteractionAction,
  ChordInteractionState,
  KeySigAction,
  KeySigState,
  NoteInteractionAction,
  NoteInteractionState,
} from "./typesAndInterfaces";

export const keySigReducer = (state: KeySigState, action: KeySigAction) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as typeof state);

  if ("type" in action && action.type in newState) newState[action.type] = true;
  return newState;
};
export const scaleReducer = (
  state: NoteInteractionState,
  action: NoteInteractionAction
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
