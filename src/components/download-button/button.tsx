import { Download } from "./icon";

export function DownloadButton() {
  return (
    <button
      className="react-pdf__Controls__button"
      aria-label="Download"
      title="Download"
      aria-disabled="false"
      role="button"
    >
      <Download />
    </button>
  );
}
