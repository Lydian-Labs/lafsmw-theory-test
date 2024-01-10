export default function gatherWidthInfo(
  currentNumBars: number,
  currentInnerWidth: number
) {
  const fullWidth = currentInnerWidth * 0.97;
  const widthOfFirstBar = currentInnerWidth / currentNumBars;
  const widthOfRemainingBars =
    (fullWidth - widthOfFirstBar - 90) / (currentNumBars - 1);

  return { widthOfFirstBar, widthOfRemainingBars };
}
