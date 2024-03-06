"use client";
import React, { useEffect, useRef, useState } from "react";
import BlueButton from "../components/BlueButton";
import CreateBlankStaves from "../components/CreateBlankStaves";
import { sharpKeySignature, flatKeySignature } from "../lib/keySignatures";
import VexFlow from "vexflow";
import { AccidentalStateType } from "../lib/typesAndInterfaces";
import { INITIAL_STAVES } from "../lib/data/stavesData";
const VF = VexFlow.Flow;
const { Renderer } = VF;

const CLEF = "treble";
const TIME_SIG = "4/4";
let KEY_SIG = "C";
let NUM_STAVES_PER_KEY_SIG = 1;
const TOTAL_NUM_STAVES = 1;
let Y_POSITION_OF_STAVES = 150;

const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [sharps, setSharps] = useState<string[]>([]);
  const [flats, setFlats] = useState<string[]>([]);
  const [state, setState] = useState<AccidentalStateType>({
    isClearMeasuresActive: false,
    isAddSharpActive: false,
    isAddFlatActive: false,
    isRemoveFlatActive: false,
    isRemoveSharpActive: false,
  });
  const toggleState = (key: keyof AccidentalStateType) => {
    setState((prevState: AccidentalStateType) => {
      let newState: AccidentalStateType = { ...prevState };
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

  const initializeRenderer = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  const renderStavesAndKeySignature = () => {
    const renderer = rendererRef.current;
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    if (context) {
      context &&
        setBlankStaves((prevState) => {
          const newStaves = [prevState];
          let xPosition = 10;
          for (let i = 0; i < TOTAL_NUM_STAVES; i++) {
            CreateBlankStaves(
              NUM_STAVES_PER_KEY_SIG,
              context,
              240,
              0,
              xPosition,
              Y_POSITION_OF_STAVES,
              CLEF,
              TIME_SIG,
              KEY_SIG
            );
            xPosition += 250;
          }
        });
    }
  };

  useEffect(() => {
    initializeRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(1100, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context &&
      setBlankStaves(
        CreateBlankStaves(
          NUM_STAVES_PER_KEY_SIG,
          context,
          240,
          180,
          10,
          Y_POSITION_OF_STAVES,
          CLEF,
          TIME_SIG,
          KEY_SIG
        )
      );
  }, []);

  useEffect(() => {
    KEY_SIG = sharpKeySignature(sharps.length);
    renderStavesAndKeySignature();
  }, [sharps]);

  useEffect(() => {
    KEY_SIG = flatKeySignature(flats.length);
    renderStavesAndKeySignature();
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
