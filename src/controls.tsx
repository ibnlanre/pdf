/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, MouseEvent, Ref, forwardRef } from "react";

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
  handleFit: (evt: MouseEvent<HTMLButtonElement>) => void;
  handleScaleInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  hideTooltip: (evt: MouseEvent<HTMLButtonElement>) => void;
  showTooltip: (evt: MouseEvent<HTMLButtonElement>) => void;
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
    showTooltip,
    hideTooltip,
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
        <p className='pdf__Controls__tooltip'>Zoom out</p>
        <button
          disabled={scale <= MINIMUM_SCALE}
          onClick={(evt) => {
            hideTooltip(evt);
            handleZoomOut();
          }}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          <MathMinus />
        </button>

        {/* SCALE INPUT */}
        <input
          type='text'
          size={pageInput.toString().length}
          value={scaleInput}
          onChange={handleScaleInput}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") handleScale();
          }}
        />

        <div className='pdf__Controls__button'>
          <p className='pdf__Controls__tooltip'>Zoom in</p>
          <button
            disabled={scale >= MAXIMUM_SCALE}
            onClick={(evt) => {
              hideTooltip(evt);
              handleZoomIn();
            }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            <MathPlus />
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <hr />

      {/* SCALE */}
      <div className='pdf__Controls__button'>
        <p className='pdf__Controls__tooltip'>Fit to width</p>{" "}
        {/* fit to width or fit to page */}
        <button
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={(evt) => {
            hideTooltip(evt);
            handleFit(evt);
          }}
        >
          <Scale />
        </button>
      </div>

      {/* ROTATE */}
      <div className='pdf__Controls__button'>
        <p className='pdf__Controls__tooltip'>Rotate</p>
        <button
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={hideTooltip}
        >
          <Rotate />
        </button>
      </div>

      {/* DOWNLOAD */}
      <div className='pdf__Controls__button'>
        <p className='pdf__Controls__tooltip'>Download</p>
        <button
          onClick={(evt) => {
            hideTooltip(evt);
            download();
          }}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
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
            transition: opacity 0.6s ease-in-out;

          hr {
            width: 0.12rem;
            height: 20px;
            border-top: 0;
            background: rgba(255,255,255,.3);
            border: none;
          }

          .pdf__Controls__button {
            display: inline-flex;
            position: relative; 
            align-items: center;
            padding-inline: 0.4rem;
            
           
            gap: 0.125rem;
            
            .pdf__Controls__tooltip{
             opacity: 0;
             position: absolute; 
             top: 1rem; 
             left: 0rem; 
             background-color: rgba(0, 0, 0, 0.75);
             color: white; 
             font-size: 0.65rem;
             width: max-content;
             padding: 0.4rem; 
             border-radius: 0.25rem;
               transition: opacity 0.3s ease-in-out;
            }

            button {
            background-color: transparent;
            border: none;
            outline;
            color: rgb(255, 255, 255);
            font-size: 1rem;
            cursor: pointer;
            padding: 5px;
            line-height: 0rem
            }

            button:hover {
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.208);
             }

             button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: transparent;

          }

          .pdf__Controls__input__wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-inline: 0.5rem;
           
            
          }

           input {
              color: rgb(255, 255, 255);
              text-align: center;
              background: rgba(0, 0, 0);
              outline: none;
              border: none;
              padding: 0.2rem 0.5rem;
              
            }
        }
      `}</style>
    </section>
  );
}

ControlsRef.displayName = "Controls";
export const Controls = forwardRef(ControlsRef);
