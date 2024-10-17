import { RotateAntiClockwise } from "./icon";

export function RotateAntiClockwiseButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Rotate Anti-clockwise"
      title="Rotate Anti-clockwise"
      aria-disabled="false"
      role="button"
    >
      <RotateAntiClockwise />
    </button>
  );
}
