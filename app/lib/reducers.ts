import {
  NoteInteractionState,
  NoteInteractionAction,
  KeySigState,
  KeySigAction,
  ChordInteractionState,
  ChordInteractionAction,
} from "./typesAndInterfaces";

export const keySigReducer = (state: KeySigState, action: KeySigAction) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as KeySigState);

  if (action.type in newState) newState[action.type] = true;
  return newState;
};

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
