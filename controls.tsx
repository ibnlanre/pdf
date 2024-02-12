import { ChangeEvent, Ref, forwardRef } from "react";

import { MAXIMUM_SCALE, MINIMUM_SCALE } from "./state";
import {
  MathMinus,
  ZoomOut,
  ZoomIn,
  MathPlus,
  SoftwareDownload,
} from "./icons";
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
  shapeAtScale: boolean;
  pageInput: number;
  numPages: number;
  scale: number;
}

function ControlsRef(props: ControlsProps, controlsRef: Ref<HTMLDivElement>) {
  const { onPrevPage, onNextPage, shapeAtScale } = props;
  const {
    handleZoomIn,
    handleZoomOut,
    handlePageInput,
    handlePageInputBlur,
    handleScale,
  } = props;
  const { pageInput, numPages, scale, title, url } = props;

  const download = useDownload({
    title,
    url,
  });

  return (
    <section ref={controlsRef} className="pdf__Controls">
      {/* PAGE INPUT */}
      <div className="pdf__Controls__button">
        <p>Page</p>
        <p className="pdf__Controls__input__wrapper">
          <input
            type="text"
            size={pageInput.toString().length}
            value={pageInput}
            onChange={handlePageInput}
            onBlur={handlePageInputBlur}
            onKeyUp={(evt) => {
              if (evt.key === "Enter") handlePageInputBlur();
            }}
          />
          <em>/</em>
          <span>{numPages}</span>
        </p>
      </div>

      {/* DIVIDER */}
      <hr />

      {/* ZOOM */}
      <div className="pdf__Controls__button">
        <button disabled={scale <= MINIMUM_SCALE} onClick={handleZoomOut}>
          <MathMinus />
        </button>

        <button onClick={handleScale}>
          {shapeAtScale ? <ZoomOut /> : <ZoomIn />}
        </button>

        <button disabled={scale >= MAXIMUM_SCALE} onClick={handleZoomIn}>
          <MathPlus />
        </button>
      </div>

      {/* DIVIDER */}
      <hr />

      {/* DOWNLOAD */}
      <div className="pdf__Controls__button">
        <button onClick={download}>
          <SoftwareDownload />
        </button>
      </div>

      <style>{`
        .pdf__Controls {
            display: flex;
            align-self: end;
            justify-self: center;
            z-index: 1;
            margin-bottom: 1rem;
            color: rgb(255, 255, 255);
            background-color: rgba(0, 0, 0, 0.75);
            width: max-content;
            border-radius: 0.375rem;
            grid-area: 1/1;

          .fade-out {
            opacity: 0;
          }

          hr {
            width: 0.125rem;
            height: auto;
            border-top: 0;
            background-color: rgba(255, 255, 255, 0.2);
          }

          .pdf__Controls__button {
            display: flex;
            align-items: center;
            padding-inline: 0.5rem;
            padding-block: 0.25rem;
            gap: 0.5rem;
          }

          .pdf__Controls__input__wrapper {
            display: flex;
            gap: 0.5rem;
            padding-inline: 0.5rem;

            input {
              background: transparent;
            }
          }
        }
      `}</style>
    </section>
  );
}

ControlsRef.displayName = "Controls";
export const Controls = forwardRef(ControlsRef);
