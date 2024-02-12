/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, Ref, forwardRef, useState, KeyboardEvent } from "react";

import { MAXIMUM_SCALE, MINIMUM_SCALE } from "./state";
import {
  MathMinus,
  ZoomOut,
  ZoomIn,
  MathPlus,
  SoftwareDownload,
  Scale,
  Rotate,
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
  } = props;
  const { pageInput, scaleInput, numPages, scale, title, url } = props;

  const download = useDownload({
    title,
    url,
  });

  return (
    <section ref={controlsRef} className='pdf__Controls'>
      {/* PAGE INPUT */}
      <div className='pdf__Controls__button'>
        <p className='pdf__Controls__input__wrapper'>
          <input
            type='text'
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
      <div className='pdf__Controls__button'>
        <button disabled={scale <= MINIMUM_SCALE} onClick={handleZoomOut}>
          <MathMinus />
        </button>

        <input
          type='text'
          size={pageInput.toString().length}
          value={scaleInput}
          onChange={handleScaleInput}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") handleScale();
          }}
        />

        <button disabled={scale >= MAXIMUM_SCALE} onClick={handleZoomIn}>
          <MathPlus />
        </button>
      </div>

      {/* DIVIDER */}
      <hr />

      {/* SCALE */}
      <div className='pdf__Controls__button'>
        <button>
          <Scale />
        </button>
      </div>

      {/* ROTATE */}
      <div className='pdf__Controls__button'>
        <button>
          <Rotate />
        </button>
      </div>

      {/* DOWNLOAD */}
      <div className='pdf__Controls__button'>
        <button onClick={download}>
          <SoftwareDownload />
        </button>
      </div>

      <style>{`
        .pdf__Controls {
            display: flex;
            align-self: end;
            align-items:center;
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
            width: 0.12rem;
            height: 20px;
            border-top: 0;
            background: rgba(255,255,255,.3);
            border: none;
          }

          .pdf__Controls__button {
            display: flex;
            align-items: center;
            padding-inline: 0.5rem;
            padding-block: 0.25rem;
            gap: 0.5rem;

            button {
            background-color: transparent;
            border: none;
            outline;
            color: rgb(255, 255, 255);
            font-size: 1rem;
            cursor: pointer;
            padding: 6px 7px;
            line-height: 0px

            }
            button:hover {
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.208);
          }

          }

          .pdf__Controls__input__wrapper {
            display: flex;
            gap: 0.5rem;
            padding-inline: 0.5rem;
            
          }

           input {
              color: rgb(255, 255, 255);
              text-align: center;
              background: rgba(0, 0, 0);
              outline: none;
              border: none;
              padding: 1px 10px;
              
            }
        }
      `}</style>
    </section>
  );
}

ControlsRef.displayName = "Controls";
export const Controls = forwardRef(ControlsRef);
