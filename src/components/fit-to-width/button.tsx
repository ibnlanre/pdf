import { FitToWidth } from "./icon";

export function FitToWidthButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Fit to width"
      title="Fit to width"
      aria-disabled="false"
      role="button"
    >
      <FitToWidth />
    </button>
  );
}
