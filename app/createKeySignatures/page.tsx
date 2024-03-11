"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
} from "react";
import BlueButton from "../components/BlueButton";
import { sharpKeySignature, flatKeySignature } from "../lib/keySignatures";
import VexFlow from "vexflow";
import { AccidentalStateType } from "../lib/typesAndInterfaces";
import { INITIAL_STAVES } from "../lib/data/stavesData";
const VF = VexFlow.Flow;
const { Renderer } = VF;
import { initializeRenderer } from "../lib/initializeRenderer";
import { staveData } from "../lib/data/stavesData";
import { setupRendererAndDrawNotes } from "../lib/setupRendererAndDrawNotes";
import { keySigReducer, noteInteractionReducer } from "../lib/reducers";
import { keySigInitialState } from "../lib/initialStates";
let KEY_SIG = "C";

const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [sharps, setSharps] = useState<string[]>([]);
  const [flats, setFlats] = useState<string[]>([]);
  const [reducerState, dispatch] = useReducer(
    keySigReducer,
    keySigInitialState
  );

  const [state, setState] = useState<AccidentalStateType>({
    isClearMeasuresActive: false,
    isAddSharpActive: false,
    isAddFlatActive: false,
    isRemoveFlatActive: false,
    isRemoveSharpActive: false,
  });
  const toggleState = (key: keyof AccidentalStateType) => {
    setState((prevState) => {
      const newState = { ...prevState };
      for (let stateKey in newState) {
        newState[stateKey as keyof AccidentalStateType] = false;
      }
      newState[key] = true;
      return newState;
    });
  };

  const createSharpKey = (): void => {
    setSharps((prevState) => [...prevState, "#"]);
    toggleState("isAddSharpActive");
  };
  const createFlatKey = (): void => {
    setFlats((prevState) => [...prevState, "b"]);
    toggleState("isAddFlatActive");
  };

  const removeSharpButton = () => {
    toggleState("isRemoveSharpActive");
    setSharps((prevState) => {
      if (prevState.length > 0) {
        const newSharps = [...prevState];
        newSharps.pop();
        return newSharps;
      }
      return prevState;
    });
  };

  const removeFlatButton = () => {
    toggleState("isRemoveFlatActive");
    setFlats((prevState) => {
      if (prevState.length > 0) {
        const newFlats = [...prevState];
        newFlats.pop();
        KEY_SIG = sharpKeySignature(newFlats.length);
        return newFlats;
      }
      return prevState;
    });
  };

  const clearKeySignatureButton = () => {
    toggleState("isClearMeasuresActive");
    setFlats(() => []);
    setSharps(() => []);
    KEY_SIG = "C";
  };

  const buttons = [
    {
      button: createSharpKey,
      text: "Add Sharp",
      stateFunction: state.isAddSharpActive,
    },
    {
      button: createFlatKey,
      text: "Add Flat",
      stateFunction: state.isAddFlatActive,
    },
    {
      button: removeFlatButton,
      text: "Remove Flat",
      stateFunction: state.isRemoveFlatActive,
    },
    {
      button: removeSharpButton,
      text: "Remove Sharp",
      stateFunction: state.isRemoveSharpActive,
    },
    {
      button: clearKeySignatureButton,
      text: "Clear Key Signature",
      stateFunction: state.isClearMeasuresActive,
    },
  ];

  const renderStaves = useCallback(
    (): void =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        keySig: KEY_SIG,
        setStaves: setBlankStaves,
        notesData: null,
        staves: blankStaves,
      }),
    [blankStaves]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
  }, []);

  useEffect(() => {
    KEY_SIG = sharpKeySignature(sharps.length);
    renderStaves();
  }, [sharps]);

  useEffect(() => {
    KEY_SIG = flatKeySignature(flats.length);
    renderStaves();
  }, [flats]);

  return (
    <>
      <div ref={container} />

      <div className="mt-2 ml-3">
        {buttons.map((button) => {
          return (
            <BlueButton
              key={button.text}
              onClick={button.button}
              isEnabled={button.stateFunction}
            >
              {button.text}
            </BlueButton>
          );
        })}
      </div>
    </>
  );
};

export default CreateKeySignatures;
