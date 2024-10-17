import { ZoomOut } from "./icon";

export function ZoomOutButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Zoom out"
      title="Zoom out"
      aria-disabled="false"
      role="button"
    >
      <ZoomOut />
    </button>
  );
}
