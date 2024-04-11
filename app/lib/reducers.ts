import {
  NoteInteractionState,
  NoteInteractionAction,
  KeySigState,
  KeySigAction,
  ChordInteractionState,
  ChordInteractionAction,
} from "./typesAndInterfaces";

export const noteInteractionReducer = (
  state: NoteInteractionState,
  action: NoteInteractionAction
) => {
  const newState = Object.keys(state).reduce((result, key) => {
    result[key] = false;
    return result;
  }, {} as NoteInteractionState);

  if (action.type in newState) {
    newState[action.type] = true;
  }

  return newState;
};

export const keySigReducer = (state: KeySigState, action: KeySigAction) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as KeySigState);

  if (action.type in newState) newState[action.type] = true;
  return newState;
};
export const chordInteractionReducer = (
  state: ChordInteractionState,
  action: ChordInteractionAction
) => {
  const newState = Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as ChordInteractionState);

  if (action.type in newState) newState[action.type] = true;
  return newState;
};
