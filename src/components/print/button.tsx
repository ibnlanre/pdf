import { Print } from "./icon";

export function PrintButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Print"
      title="Print"
      aria-disabled="false"
      role="button"
    >
      <Print />
    </button>
  );
}
