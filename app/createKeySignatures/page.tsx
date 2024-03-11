"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
  useMemo,
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
import { keySigReducer } from "../lib/reducers";
import { keySigInitialState } from "../lib/initialStates";
import { getUserClickInfo } from "../lib/getUserClickInfo";
import { modifyKeySigButtonGroup } from "../lib/buttonsAndButtonGroups";
let KEY_SIG = "C";
import { sharpKeyYPositions } from "../lib/keySignatures";
const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [sharps, setSharps] = useState<string[]>([]);
  const [flats, setFlats] = useState<string[]>([]);
  const [keySignature, setKeySignature] = useState("C");
  const [state, dispatch] = useReducer(keySigReducer, keySigInitialState);

  const buttonGroup = useMemo(
    () => modifyKeySigButtonGroup(dispatch, state),
    [dispatch, state]
  );

  const renderStaves = useCallback(
    (): void =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        keySig: keySignature,
        setStaves: setBlankStaves,
        staves: blankStaves,
      }),
    [blankStaves, keySignature]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
  }, [keySignature]);

  const handleClick = (e: React.MouseEvent) => {
    const { rect, userClickY, spacingBetweenLines, topStaveYPosition } =
      getUserClickInfo(e, container, blankStaves[0]);
    const noteClickedOn =
      rect &&
      sharpKeyYPositions(userClickY, topStaveYPosition, spacingBetweenLines);

    if (state.isAddSharpActive) {
      if (noteClickedOn === "F#") {
        setKeySignature(() => "G");
      } else if (noteClickedOn === "C#") {
        setKeySignature(() => "D");
      } else if (noteClickedOn === "G#") {
        setKeySignature(() => "A");
      } else if (noteClickedOn === "D#") {
        setKeySignature(() => "E");
      } else if (noteClickedOn === "A#") {
        setKeySignature(() => "B");
      } else if (noteClickedOn === "E#") {
        setKeySignature(() => "F#");
      } else if (noteClickedOn === "B#") {
        setKeySignature(() => "C#");
      } else return;
    }
    if (state.isClearKeySigActive) {
      setKeySignature(() => "C");
    }
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />

      <div className="mt-2 ml-3">
        {buttonGroup.map((button) => {
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
      </div>
    </>
  );
};

export default CreateKeySignatures;
