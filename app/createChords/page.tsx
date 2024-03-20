"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
const VF = VexFlow.Flow;
import BlueButton from "../components/BlueButton";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import { clearAllMeasures, buttonGroup } from "../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../lib/getUserClickInfo";
import { handleNoteInteraction } from "../lib/handleNoteInteraction";
import { chordInteractionInitialState } from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { chordInteractionReducer } from "../lib/reducers";
import { modifyChordsActionTypes } from "../lib/actionTypes";
import { setupRendererAndDrawNotes } from "../lib/setupRendererAndDrawNotes";
import {
  ChordInteractionAction,
  NoteStringData,
  StaveNoteData,
  StaveType,
  ChordType,
  StaveNoteType,
} from "../lib/typesAndInterfaces";
import createBlankStaves from "../lib/createBlankStaves";
const { Renderer } = VexFlow.Flow;

const CreateChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [chordData, setChordData] = useState(INITIAL_STAVES);
  const [state, dispatch] = useReducer(
    chordInteractionReducer,
    chordInteractionInitialState
  );

  const renderMusic = (notes: StaveNoteType[]) => {
    if (notes.length > 0 && context) {
      // Create a voice and add the chord notes
      const voice = new VF.Voice({ num_beats: 4, beat_value: 1 }).addTickables(
        notes
      );
      // Format and draw the notes
      new VF.Formatter().joinVoices([voice]).format([voice], 300);
      voice.draw(context, staves[0]);
    }
  };
  const addNoteToChord = (noteName = "C/4") => {
    const staveNote = new VF.StaveNote({
      keys: [noteName],
      duration: "q",
    });

    const newChordNotes = [...chordData, staveNote];
    setChordData(newChordNotes);
    renderMusic(newChordNotes);
  };
  const context = rendererRef.current?.getContext();

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const renderer = rendererRef?.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 12);
    context?.clear();
    if (context && rendererRef) {
      setStaves(() =>
        createBlankStaves({
          numStaves: 1,
          context,
          firstStaveWidth: 300,
          x: 10,
          y: 150,
          regularStaveWidth: 300,
          clef: "treble",
        })
      );
    }
  }, []);

  useEffect(() => {
    renderMusic(chordData);
  }, [chordData]);

  return (
    <>
      <div ref={container} onClick={() => addNoteToChord()} />
    </>
  );
};

export default CreateChords;
