"use client";
import { modifyChordsActionTypes } from "@/app/lib/actionTypes";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
import BlueButton from "../../components/BlueButton";
import CheckIfNoteFound from "../../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../../components/CheckNumBeatsInMeasure";
import { buttonGroup } from "../../lib/buttonsAndButtonGroups";
import { staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { chordInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { chordReducer } from "../../lib/reducer";
import { setupRendererAndDrawChords } from "@/app/lib/setUpRendererAndDrawChords";
import { NoteStringData, StaveType, Chord } from "../../lib/typesAndInterfaces";
import { handleChordInteraction } from "@/app/lib/handleChordInteraction";
import {
  updateKeysAndAddAccidentals,
  eraseAccidentalFromChordData,
  eraseAccidentalFromNotesAndCoordinates,
  addAllNotesAndAccidentals,
  addAccidentalToNotesAndCoordinates,
  redrawChordAfterRemovingAccidental,
} from "@/app/lib/modifyChords2";

const { Renderer } = VexFlow.Flow;

const ManageChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [state, dispatch] = useReducer(
    chordReducer,
    chordInteractionInitialState
  );
  const [barIndex, setBarIndex] = useState<number>(0);
  const [chordData, setChordData] = useState<Chord>({
    keys: [],
    duration: "w",
    staveNotes: null,
    userClickY: 0,
    accidentals: [{ key: [], accidental: null }],
  });

  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NoteStringData[]
  >([{ note: "", yCoordinateMax: 0, yCoordinateMin: 0 }]);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const modifyChordsButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );

  const eraseChord = () => {
    setChordData((): Chord => {
      const newState = {
        keys: [],
        duration: "w",
        staveNotes: null,
        userClickY: 0,
        accidentals: [{ key: [], accidental: null }],
      };
      return newState;
    });
    renderStavesAndChords();
  };

  const renderStavesAndChords = useCallback(
    (): void =>
      setupRendererAndDrawChords({
        rendererRef,
        ...staveData,
        setStaves,
        chordData,
        staves,
        barIndex,
      }),
    [rendererRef, setStaves, chordData, staves, barIndex]
  );

  useEffect(() => {
    const initialNotesAndCoordinates = generateYMinAndYMaxForAllNotes(
      147, //need to find a way to not hard code the high G position
      notesArray
    );
    setNotesAndCoordinates(initialNotesAndCoordinates);
  }, []);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStavesAndChords();
  }, []);

  useEffect(() => {
    renderStavesAndChords();
  }, [chordData]);

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX, highGYPosition } = getUserClickInfo(
      e,
      container,
      staves[0]
    );

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    let chordDataCopy = { ...chordData };
    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    setBarIndex(() => {
      const newNum = findBarIndex(staves, userClickX);
      return newNum;
    });

    const foundNoteIndex: number = chordData.keys.findIndex(
      (note) => note === foundNoteData?.note
    );

    if (!foundNoteData) {
      noNoteFound();
    } else if (state.isSharpActive || state.isFlatActive) {
      notesAndCoordinatesCopy = addAccidentalToNotesAndCoordinates(
        state,
        foundNoteData,
        notesAndCoordinatesCopy
      );
      if (foundNoteIndex !== -1) {
        chordDataCopy = updateKeysAndAddAccidentals(
          state,
          chordDataCopy,
          foundNoteIndex
        );
      }
    } else if (state.isEraseAccidentalActive) {
      notesAndCoordinatesCopy = eraseAccidentalFromNotesAndCoordinates(
        notesAndCoordinatesCopy,
        foundNoteData
      );
      if (foundNoteIndex !== -1) {
        chordDataCopy = eraseAccidentalFromChordData(
          chordDataCopy,
          foundNoteIndex
        );
      }
      chordDataCopy = redrawChordAfterRemovingAccidental(chordDataCopy);
    } else if (state.isEraseNoteActive) {
      if (foundNoteIndex !== -1) {
      }
    } else {
      if (chordData.keys.length >= 4) return;

      chordDataCopy = addAllNotesAndAccidentals(chordDataCopy, foundNoteData);
    }
    setNotesAndCoordinates(() => notesAndCoordinatesCopy);
    setChordData(() => chordDataCopy);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={state.tooManyBeatsInMeasure}
        openEnterNotes={dispatch}
      />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound || false}
        openEnterNotes={dispatch}
      />
      <div className="mt-2 ml-3">
        {modifyChordsButtonGroup.map((button) => {
          return (
            <BlueButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
            >
              {button.text}
            </BlueButton>
          );
        })}
        <BlueButton onClick={eraseChord}>Erase Chord</BlueButton>
      </div>
    </>
  );
};

export default ManageChords;
