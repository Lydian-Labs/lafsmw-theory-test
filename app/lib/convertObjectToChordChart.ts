export default function convertObjectToChordChart(
  inputObject: any,
  beatsPerBar = 4,
  numBarsPerLine = 4
) {
  const totalLength = Object.keys(inputObject).length;
  const numBars = totalLength / beatsPerBar;
  const numLines = Math.ceil(numBars / numBarsPerLine);

  // Initialize an array with empty strings for the total length
  const outputArray = Array.from(
    { length: totalLength },
    (_, i) => inputObject[i] || ""
  );

  let result = "";

  for (let i = 0; i < numLines; i++) {
    for (let j = 0; j < numBarsPerLine; j++) {
      const start = i * numBarsPerLine * beatsPerBar + j * beatsPerBar;
      const end = start + beatsPerBar;
      if (start < totalLength) {
        const bar = outputArray
          .slice(start, end)
          .map((chord) => chord.padEnd(2, "-"))
          .join("");
        result += `|-${bar.padEnd(beatsPerBar * 2 - 1, "-")}`;
      }
    }
    result += "|\n";
  }

  return result;
}

// const input = {
//   0: "I",
//   1: "",
//   2: "V7",
//   3: "",
//   4: "I",
//   5: "",
//   6: "",
//   7: "",
//   8: "ii/V",
//   9: "",
//   10: "V",
//   11: "",
//   12: "",
//   13: "IV",
//   14: "",
//   15: "V",
//   16: "I",
//   17: "",
//   18: "",
//   19: "",
//   20: "vi",
//   21: "V",
//   22: "I",
//   23: "",
//   24: "",
//   25: "",
//   26: "",
//   27: "",
//   28: "vii",
//   29: "",
//   30: "",
//   31: "",
// };

// console.log(convertObjectToString(input));
