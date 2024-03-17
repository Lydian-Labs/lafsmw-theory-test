import * as VexFlow from "vexflow";
const { Renderer } = VexFlow.Flow;

export const initializeRenderer = (
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.RefObject<HTMLDivElement | null>
): void => {
  if (!renderer.current && container.current) {
    renderer.current = new Renderer(container.current, Renderer.Backends.SVG);
  }
};
