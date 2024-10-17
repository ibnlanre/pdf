import { ZoomIn } from "./icon";

export function ZoomOutButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Zoom in"
      title="Zoom in"
      aria-disabled="false"
      role="button"
    >
      <ZoomIn />
    </button>
  );
}
