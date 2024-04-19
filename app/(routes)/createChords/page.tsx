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
import { reducer } from "../../lib/reducer";
import { setupRendererAndDrawChords } from "@/app/lib/setUpRendererAndDrawChords";
import { NoteStringData, StaveType, Chord } from "../../lib/typesAndInterfaces";

const { Renderer, StaveNote, Accidental } = VexFlow.Flow;

const ManageChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [state, dispatch] = useReducer(reducer, chordInteractionInitialState);
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
    renderStavesAndNotes();
  };

  const renderStavesAndNotes = useCallback(
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
    renderStavesAndNotes();
  }, []);

  useEffect(() => {
    renderStavesAndNotes();
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

    const index: number = chordData.keys.findIndex(
      (note) => note === updatedFoundNoteData.note
    );

    if (!updatedFoundNoteData) {
      noNoteFound();
    } else if (state.isSharpActive || state.isFlatActive) {
      if (index !== -1) {
        if (state.isSharpActive) {
          const newIndexArray = [...chordDataCopy.sharpIndexArray, index];
          chordDataCopy = {
            ...chordDataCopy,
            sharpIndexArray: newIndexArray,
          };
        } else if (state.isFlatActive) {
          const newIndexArray = [...chordDataCopy.flatIndexArray, index];
          chordDataCopy = {
            ...chordDataCopy,
            flatIndexArray: newIndexArray,
          };
        }
        const newChord = new StaveNote({
          keys: chordDataCopy.keys,
          duration: chordData.duration,
        });

        // Add all the sharps
        chordDataCopy.sharpIndexArray.forEach((sharpIndex) => {
          newChord.addModifier(new Accidental("#"), sharpIndex);
        });

        // Add all the flats
        chordDataCopy.flatIndexArray.forEach((flatIndex) => {
          newChord.addModifier(new Accidental("b"), flatIndex);
        });

        chordDataCopy = {
          ...chordDataCopy,
          staveNotes: newChord,
        };
      }
    } else if (state.isEraseSharpActive || state.isEraseFlatActive) {
      if (state.isEraseSharpActive) {
        const updatedSharpIndexArray = [...chordDataCopy.sharpIndexArray];
        updatedSharpIndexArray.splice(index, 1);
        const newChord = new StaveNote({
          keys: chordDataCopy.keys,
          duration: chordDataCopy.duration,
        });
        // redraw sharps
        updatedSharpIndexArray.forEach((sharpIndex) => {
          newChord.addModifier(new Accidental("#"), sharpIndex);
        });
        chordDataCopy = {
          ...chordDataCopy,
          sharpIndexArray: updatedSharpIndexArray,
          staveNotes: newChord,
        };
      } else if (state.isEraseFlatActive) {
        const updatedFlatIndexArray = [...chordDataCopy.flatIndexArray];
        updatedFlatIndexArray.splice(index, 1);
        const newChord = new StaveNote({
          keys: chordDataCopy.keys,
          duration: chordDataCopy.duration,
        });
        // redraw flats
        updatedFlatIndexArray.forEach((flatIndex) => {
          newChord.addModifier(new Accidental("b"), flatIndex);
        });
        chordDataCopy = {
          ...chordDataCopy,
          flatIndexArray: updatedFlatIndexArray,
          staveNotes: newChord,
        };
      }
    } else if (state.isEraseNoteActive) {
      if (chordDataCopy.staveNotes) {
        if (index !== -1) {
          const updatedKeys = [...chordDataCopy.keys];
          updatedKeys.splice(index, 1);
          const newChord = new StaveNote({
            keys: updatedKeys,
            duration: chordData.duration,
          });

          chordDataCopy = {
            ...chordDataCopy,
            keys: updatedKeys,
            staveNotes: newChord,
          };
        }
      }
    } else {
      if (chordData.keys.length >= 4) return;

      const updatedKeys = [...chordDataCopy.keys, updatedFoundNoteData.note];

      const newChord = new StaveNote({
        keys: updatedKeys,
        duration: chordDataCopy.duration,
      });

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
