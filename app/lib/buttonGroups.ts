
export const modifyStaveNotesButtonGroup = (dispatch) => {
  const eraseNote = () => dispatch({ type: "isEraseNoteActive" });
  const enterNote = () => dispatch({ type: "isEnterNoteActive" });
  const addSharp = () => dispatch({ type: "isSharpActive" });
  const addFlat = () => dispatch({ type: "isFlatActive" });
  const eraseAccidental = () => dispatch({ type: "isEraseAccidentalActive" });
  const changeNote = () => dispatch({ type: "isChangeNoteActive" });

  const buttonConfig = [
    { action: enterNote, text: "Enter Note", stateKey: "isEnterNoteActive" },
    { action: eraseNote, text: "Erase Note", stateKey: "isEraseNoteActive" },
    { action: changeNote, text: "Change Note", stateKey: "isChangeNoteActive" },
    { action: addSharp, text: "Add Sharp", stateKey: "isSharpActive" },
    { action: addFlat, text: "Add Flat", stateKey: "isFlatActive" },
    {
      action: eraseAccidental,
      text: "Erase Accidental",
      stateKey: "isEraseAccidentalActive",
    },
  ];

  return buttonConfig;
};
