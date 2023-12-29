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
  const fullWidth = width * 0.97;
  const widthOfFirstBar = width / numBars;
  const widthOfRemainingBars =
    (fullWidth - widthOfFirstBar - 90) / (numBars - 1);

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
