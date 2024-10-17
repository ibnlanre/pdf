/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, MouseEvent, Ref, forwardRef } from "react";

import { ZoomIn } from "./components/zoom-in/icon";
import { ZoomOut } from "./components/zoom-out/icon";
import { ControlButton } from "./control-button";
import { MAXIMUM_SCALE, MINIMUM_SCALE } from "./provider/state";
import { useDownload } from "./use-download";

interface ControlsProps {
  url: string;
  title: string;
  onPrevPage: () => void;
  onNextPage: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handlePageInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  handlePageInputBlur: () => void;
  handleScale: () => void;
  handleFit: (evt: MouseEvent<HTMLButtonElement>) => void;
  handleScaleInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  shapeAtScale: boolean;
  pageInput: number;
  numPages: number;
  scale: number;
  scaleInput: string;
}

function ControlsRef(props: ControlsProps, controlsRef: Ref<HTMLDivElement>) {
  const { onPrevPage, onNextPage, shapeAtScale } = props;
  const {
    handleZoomIn,
    handleZoomOut,
    handlePageInput,
    handlePageInputBlur,
    handleScaleInput,
    handleScale,
    handleFit,
  } = props;
  const { pageInput, scaleInput, numPages, scale, title, url } = props;

  const download = useDownload({
    title,
    url,
  });

  return (
    <section ref={controlsRef} className="react-pdf__Controls">
      {/* PAGE INPUT */}
      <div className="react-pdf__Controls__group">
        <p className="react-pdf__Controls__input-wrapper">
          <input
            type="text"
            title="Page number"
            aria-label="Page number"
            className="react-pdf__Controls__input react-pdf__Controls__page-input"
            value={pageInput}
            onChange={handlePageInput}
            onKeyUp={(evt) => {
              if (evt.key === "Enter") handlePageInputBlur();
            }}
          />
          <em>/</em>
          <span title="Total pages" aria-label="Total pages">
            {numPages}
          </span>
        </p>
      </div>

      {/* DIVIDER */}
      <hr className="react-pdf__Controls__vertical-separator" />

      <section className="react-pdf__Controls__group">
        {/* ZOOM OUT */}
        <ControlButton
          disabled={scale <= MINIMUM_SCALE}
          icon={<ZoomOut />}
          label="Zoom out"
          onClick={handleZoomOut}
        />

        {/* SCALE INPUT */}
        <input
          aria-label="Zoom level"
          className="react-pdf__Controls__input react-pdf__Controls__scale-input"
          type="text"
          value={scaleInput}
          onChange={handleScaleInput}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") handleScale();
          }}
        />

        {/* ZOOM IN */}
        <ControlButton
          disabled={scale >= MAXIMUM_SCALE || !shapeAtScale}
          icon={<ZoomIn />}
          label="Zoom in"
          onClick={handleZoomIn}
        />
      </section>

      {/* DIVIDER */}
      <hr className="react-pdf__Controls__vertical-separator" />

      <section className="react-pdf__Controls__group">
        <ControlButton
          icon={<Scale />}
          label="Fit to width"
          onClick={handleFit}
        />
        <ControlButton icon={<Rotate />} label="Rotate" />
        <ControlButton
          icon={<SoftwareDownload />}
          label="Download"
          onClick={download}
        />
      </section>

      <style>{`
        .react-pdf__Controls {
          background-color: var(--react-pdf__controls-background);
          height: var(--react-pdf__controls-height);
          border-radius: var(--react-pdf__controls-border-radius);
          padding: var(--react-pdf__controls-padding);
          font-size: var(--react-pdf__controls-font-size);
          transition: opacity 0.6s ease-in-out;
          display: flex;
          align-self: end;
          align-items: center;
          justify-self: center;
          color: inherit;
          gap: 0.75rem;
          width: max-content;
        }
          
        .react-pdf__Controls__group {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .react-pdf__Controls__vertical-separator {
          border-top: 0;
          border: none;
          background: color-mix(in srgb, var(--react-pdf__controls-color) 30%, transparent);
          height: 15px;
          width: 1px;
        }

        .react-pdf__Controls__input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-inline: 0.5rem;
        }

        .react-pdf__Controls__input {
          background: var(--react-pdf__input-background);
          border: var(--react-pdf__input-border);
          border-radius: var(--react-pdf__input-border-radius);
          color: var(--react-pdf__input-color);
          outline: var(--react-pdf__input-outline);
          padding: var(--react-pdf__input-padding);
          text-align: center;
          caret-color: currentColor;
          font-size: inherit;
        }

        .react-pdf__Controls__scale-input {
          --scale-content-width: ${scaleInput.length};
          width: calc(max(2,var(--scale-content-width)) * 1ch + 3ch);
        }

        .react-pdf__Controls__page-input {
          --page-selector-content-width: ${pageInput.toString().length};
          width: max(2.5ch, calc(var(--page-selector-content-width) * 1ch) + 0.5rem);
        }
      `}</style>
    </section>
  );
}

ControlsRef.displayName = "Controls";
export const Controls = forwardRef(ControlsRef);
