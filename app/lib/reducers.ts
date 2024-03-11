import {
  NoteInteractionState,
  Action,
  KeySigState,
} from "./typesAndInterfaces";

export const noteInteractionReducer = (
  state: NoteInteractionState,
  action: Action
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
export const keySigReducer = (state: KeySigState, action: Action) => {
  const newState = Object.keys(state).reduce((result, key) => {
    result[key] = false;
    return result;
  }, {} as KeySigState);

  if (action.type in newState) {
    newState[action.type] = true;
  }

  return newState;
};
