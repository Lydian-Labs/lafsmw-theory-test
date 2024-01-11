import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { Stave } = VF;

type BarCoordinatesData = {
  barWidth: number;
  xMaxCoordinate: number;
};

export const findBarIndex = (
  bars: InstanceType<typeof Stave>[],
  userClickXCoordinate: number
): number => {
  let staveIndex: number = 0;

  const barWidthAndXMaxCoordinate: BarCoordinatesData[] = bars.map(
    (bar, index) => {
      const barWidth = bar.getWidth();
      const xMaxCoordinateForBar1 = bars[0].getWidth();
      let xMaxCoordinate = xMaxCoordinateForBar1 + bars[1].getWidth() * index;
      return {
        barWidth,
        xMaxCoordinate,
      };
    }
  );

  for (let i = 0; i < barWidthAndXMaxCoordinate.length; i++) {
    if (userClickXCoordinate < barWidthAndXMaxCoordinate[i].xMaxCoordinate) {
      staveIndex = i;
      break;
    }
  }
  return staveIndex;
};
