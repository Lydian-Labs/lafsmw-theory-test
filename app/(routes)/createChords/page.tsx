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
  addAllAccidentalsToChord,
  addIndexToChordData,
  updatedChord,
  eraseAccidental,
  redrawUpdatedChord,
  eraseNoteFromChord,
} from "@/app/lib/modifyChord";

const { Renderer, StaveNote } = VexFlow.Flow;

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
    sharpIndexArray: [],
    flatIndexArray: [],
  });

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
        sharpIndexArray: [],
        flatIndexArray: [],
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
    initializeRenderer(rendererRef, container);
    renderStavesAndChords();
  }, []);

  useEffect(() => {
    renderStavesAndChords();
  }, [chordData]);

  let updatedFoundNoteData: NoteStringData;

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX, highGYPosition } = getUserClickInfo(
      e,
      container,
      staves[0]
    );
    let foundNoteData = generateYMinAndYMaxForAllNotes(
      highGYPosition,
      notesArray
    ).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    let chordDataCopy = { ...chordData };

    setBarIndex(() => {
      const newNum = findBarIndex(staves, userClickX);
      return newNum;
    });

    if (foundNoteData)
      updatedFoundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    const foundNoteIndex: number = chordData.keys.findIndex(
      (note) => note === updatedFoundNoteData?.note
    );

    if (!updatedFoundNoteData) {
      noNoteFound();
    } else if (state.isSharpActive || state.isFlatActive) {
      if (foundNoteIndex !== -1) {
        chordDataCopy = state.isSharpActive
          ? addIndexToChordData(
              foundNoteIndex,
              "sharpIndexArray",
              chordDataCopy
            )
          : addIndexToChordData(
              foundNoteIndex,
              "flatIndexArray",
              chordDataCopy
            );
        chordDataCopy = redrawUpdatedChord(chordDataCopy);
      }
    } else if (state.isEraseFlatActive || state.isEraseSharpActive) {
      if (foundNoteIndex !== -1) {
        chordDataCopy = state.isEraseSharpActive
          ? eraseAccidental(foundNoteIndex, "sharpIndexArray", chordDataCopy)
          : eraseAccidental(foundNoteIndex, "flatIndexArray", chordDataCopy);
        chordDataCopy = redrawUpdatedChord(chordDataCopy);
      }
    } else if (state.isEraseNoteActive) {
      if (foundNoteIndex !== -1) {
        chordDataCopy = eraseNoteFromChord(foundNoteIndex, chordDataCopy);
        chordDataCopy = redrawUpdatedChord(chordDataCopy);
      }
    } else {
      if (chordData.keys.length >= 4) return;

      const updatedKeys = [...chordDataCopy.keys, updatedFoundNoteData.note];

      const newChord = updatedChord(chordDataCopy, updatedKeys);

      addAllAccidentalsToChord(chordDataCopy, newChord);

      chordDataCopy = {
        ...chordDataCopy,
        keys: updatedKeys,
        staveNotes: newChord,
        userClickY: userClickY,
      };
    }
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
