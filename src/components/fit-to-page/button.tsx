import { FitToPage } from "./icon";

export function FitToPageButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Fit to width"
      title="Fit to width"
      aria-disabled="false"
      role="button"
    >
      <FitToPage />
    </button>
  );
}
