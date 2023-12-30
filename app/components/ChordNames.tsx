import gatherWidthInfo from "../lib/gatherWidthInfo";

type ChordNamesProps = {
  width: number;
  chordNames: string[];
};

export default function ChordNames({
  width = 1650,
  chordNames = ["C", "C", "C", "C"],
}: ChordNamesProps) {
  const numBars = chordNames.length;

  // Gather needed width info.
  const { widthOfFirstBar, widthOfRemainingBars } = gatherWidthInfo(
    numBars,
    width
  );

  const remainingBarsString = (numBars - 1).toString();

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `${widthOfFirstBar}px repeat(${remainingBarsString}, ${widthOfRemainingBars}px)`,
    paddingLeft: "5rem",
  };

  return (
    <div style={gridInputInline}>
      {chordNames.map((chordName, i) => (
        <div key={i}>{chordName}</div>
      ))}
    </div>
  );
}
