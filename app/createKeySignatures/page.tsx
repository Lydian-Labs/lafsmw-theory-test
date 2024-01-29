"use client";
import React, { useEffect, useRef, useState } from "react";
import BlueButton from "../components/BlueButton";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { sharpKeySignature, flatKeySignature } from "../lib/keySignatures";
import { StaveType } from "../lib/typesAndInterfaces";
import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const CLEF = "treble";
const TIME_SIG = "4/4";
let KEY_SIG = "C";
let NUM_STAVES = 1;
let Y_POSITION_OF_STAVES = 150;

const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState<StaveType[]>([]);
  const [sharps, setSharps] = useState<string[]>([]);
  const [flats, setFlats] = useState<string[]>([]);

  const createSharpKey = (): void => {
    setSharps((prevState) => [...prevState, "#"]);
  };
  const createFlatKey = (): void => {
    setFlats((prevState) => [...prevState, "b"]);
  };

  const removeSharpButton = () => {
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
    setFlats(() => []);
    setSharps(() => []);
    KEY_SIG = "C";
  };

  const buttons = [
    {
      button: createSharpKey,
      text: "Add Sharp",
      stateFunction: createSharpKey,
    },
    {
      button: createFlatKey,
      text: "Add Flat",
      stateFunction: createFlatKey,
    },
    {
      button: removeFlatButton,
      text: "Remove Flat",
      stateFunction: removeFlatButton,
    },
    {
      button: removeSharpButton,
      text: "Remove Sharp",
      stateFunction: removeSharpButton,
    },
    {
      button: clearKeySignatureButton,
      text: "Clear Key Signature",
      stateFunction: clearKeySignatureButton,
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
        setBlankStaves(() =>
          KaseyBlankStaves(
            NUM_STAVES,
            context,
            240,
            160,
            10,
            Y_POSITION_OF_STAVES,
            CLEF,
            TIME_SIG,
            KEY_SIG
          )
        );
    }
  };

  useEffect(() => {
    initializeRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context &&
      setBlankStaves(
        KaseyBlankStaves(
          NUM_STAVES,
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
            <BlueButton key={button.text} onClick={button.button} isEnabled>
              {button.text}
            </BlueButton>
          );
        })}
      </div>
    </>
  );
};

export default CreateKeySignatures;
