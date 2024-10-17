/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, MouseEvent, useCallback, useMemo, useRef } from "react";
import { Controls } from "../src/controls";
import { useHeight } from "../src/use-height";
import { Viewer } from "../src/viewer";
import { withPercentage } from "../src/with-percentage";
import { ActionTypes, MAXIMUM_SCALE, MINIMUM_SCALE } from "./provider/state";

interface FrameProps {
  title: string;
  url: string;
}

export function Frame(props: FrameProps) {
  const { title, url } = props;

  const { loading, activePage, pageInput, scaleInput, numPages, scale, node } =
    state;
  const { frameWidth, frameHeight, pageWidth, pageHeight } = state;

  // REFS
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const frameRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      dispatch({
        type: ActionTypes.SET_FRAME_WIDTH,
        payload: node.offsetWidth,
      });
      dispatch({
        type: ActionTypes.SET_FRAME_HEIGHT,
        payload: node.offsetHeight,
      });
      dispatch({ type: ActionTypes.SET_NODE, payload: node });
    }
  }, []);
  const { height, width } = useHeight(containerRef);

  // useEffect(() => {
  //   dispatch({ type: ActionTypes.SET_PAGE_INPUT, payload: activePage.toString() });
  // }, [activePage, scale]);

  // PAGINATION

  const onPrevPage = useCallback(() => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload: activePage - 1 });
  }, [activePage]);

  const onNextPage = useCallback(() => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload: activePage + 1 });
  }, [activePage]);

  // HIDE/SHOW CONTROLS

  const hideControls = useCallback(() => {
    // console.log(controlsRef.current?.classList);
    if (controlsRef.current) {
      controlsRef.current.style.opacity = "0";
    }
  }, []);

  const showControls = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.opacity = "1";
    }
  }, []);

  // ZOOM HANDLERS

  const handleZoomIn = useCallback(() => {
    const zoom = +(scale + 0.25).toFixed(2);
    const payload = zoom > MAXIMUM_SCALE ? MAXIMUM_SCALE : zoom;
    dispatch({ type: ActionTypes.SET_SCALE, payload });
    dispatch({
      type: ActionTypes.SET_SCALE_INPUT,
      payload: withPercentage(payload * 100),
    });
  }, [scale]);

  const handleZoomOut = useCallback(() => {
    const zoom = +(scale - 0.25).toFixed(2);
    const payload = zoom < MINIMUM_SCALE ? MINIMUM_SCALE : zoom;
    dispatch({ type: ActionTypes.SET_SCALE, payload });
    dispatch({
      type: ActionTypes.SET_SCALE_INPUT,
      payload: withPercentage(payload * 100),
    });
  }, [scale]);

  // SCALE INPUT HANDLERS

  const handleScale = useCallback(() => {
    const scale = Number.isNaN(Number(scaleInput))
      ? 1
      : Number(scaleInput) / 100;

    if (scale < MINIMUM_SCALE) {
      dispatch({ type: ActionTypes.SET_SCALE, payload: MINIMUM_SCALE });
      dispatch({
        type: ActionTypes.SET_SCALE_INPUT,
        payload: withPercentage(MINIMUM_SCALE * 100),
      });
    } else if (scale > MAXIMUM_SCALE) {
      dispatch({ type: ActionTypes.SET_SCALE, payload: MAXIMUM_SCALE });
      dispatch({
        type: ActionTypes.SET_SCALE_INPUT,
        payload: withPercentage(MAXIMUM_SCALE * 100),
      });
    } else {
      dispatch({ type: ActionTypes.SET_SCALE, payload: scale });
      dispatch({
        type: ActionTypes.SET_SCALE_INPUT,
        payload: withPercentage(scaleInput),
      });
    }
  }, [scaleInput]);

  const handleScaleInput = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = parseInt(evt.target.value);
    if (Number.isNaN(sanitizedValue)) {
      dispatch({ type: ActionTypes.SET_SCALE_INPUT, payload: "" });
      return;
    }

    dispatch({
      type: ActionTypes.SET_SCALE_INPUT,
      payload: sanitizedValue.toString(),
    });
  }, []);

  // FIT TO WIDTH HANDLER
  const handleFit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      const button = evt.currentTarget;
      const toolTip = button.previousElementSibling as HTMLElement;
      let fitScale;

      const fitToWidth = +(frameWidth / pageWidth).toFixed(2);
      const fitToPage = +(pageWidth / frameWidth).toFixed(2);

      if (scale !== fitToPage) {
        button.style.transform = "rotate(180deg)";
        fitScale = fitToPage;
        toolTip.textContent = "Fit to width";
      } else {
        button.style.transform = "rotate(90deg)";
        fitScale = fitToWidth;
        toolTip.textContent = "Fit to page";
      }

      dispatch({ type: ActionTypes.SET_SCALE, payload: fitScale });
      dispatch({
        type: ActionTypes.SET_SCALE_INPUT,
        payload: `${(fitScale * 100).toString()}%`,
      });
    },
    [frameWidth, pageWidth, scale]
  );

  const handlePageDimensions = useCallback(
    (page: { width: number; height: number }) => {
      dispatch({ type: ActionTypes.SET_PAGE_WIDTH, payload: page.width });
      dispatch({ type: ActionTypes.SET_PAGE_HEIGHT, payload: page.height });
    },
    []
  );

  const handleActivePage = useCallback((pageNumber: number) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload: pageNumber });
  }, []);

  // PAGE INPUT HANDLERS

  const handlePageInput = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const pageInput = parseInt(evt.target.value);
      const page = Number.isNaN(pageInput) ? 1 : pageInput;
      const payload = page > 0 && page <= numPages ? page : activePage;
      dispatch({ type: ActionTypes.SET_ACTIVE_PAGE, payload });
    },
    [activePage, numPages]
  );

  const handlePageInputBlur = useCallback(() => {
    if (pageInput) {
      const attr = `[data-page-number="${pageInput}"]`;
      const target = document.querySelector(attr) as HTMLDivElement;

      if (target) {
        target.parentElement?.scrollTo({
          left: target.offsetLeft,
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [pageInput]);

  const handleLoading = useCallback((loading: boolean) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  }, []);

  const handleNumPages = useCallback((numPages: number) => {
    dispatch({ type: ActionTypes.SET_NUM_PAGES, payload: numPages });
  }, []);

  // INTERSECTION OBSERVER

  const shapeAtScale = useMemo(() => {
    return pageWidth * scale >= frameWidth;
  }, [scale, pageWidth, frameWidth]);

  return (
    <div className="react-pdf__Container" ref={containerRef}>
      <section className="react-pdf__Toolbar">
        <Controls
          url={url}
          title={title}
          ref={controlsRef}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handlePageInput={handlePageInput}
          handlePageInputBlur={handlePageInputBlur}
          handleScale={handleScale}
          handleFit={handleFit}
          handleScaleInput={handleScaleInput}
          shapeAtScale={shapeAtScale}
          pageInput={activePage}
          numPages={numPages}
          scale={scale}
          scaleInput={scaleInput}
        />
      </section>

      <article className="react-pdf__Frame" ref={frameRef}>
        <Viewer
          url={url}
          numPages={numPages}
          loading={loading}
          handleLoading={handleLoading}
          handleNumPages={handleNumPages}
          handlePageDimensions={handlePageDimensions}
          handleActivePage={handleActivePage}
          activePage={activePage}
          node={node}
          hideControls={hideControls}
          showControls={showControls}
        />
      </article>

      <style>{`
        .react-pdf__Container {
          display: flex;
          background-color: rgb(82, 86, 89);
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        
        .react-pdf__Frame {
          position: relative;
          width: 100%;
          max-height: 100%;
          overflow: auto;
          display: grid;
          flex: 1;

          .react-pdf__Document {
            text-align: center;
            overflow: auto;
            gap: 0.75rem;
            display: flex;
            flex-direction: column;
            grid-area: 1/1;

            .react-pdf__Page {
              minheight: inherit !important;
              margin: 0 auto;

              .react-pdf__Page__canvas {
                fill: rgb(255, 255, 255);
                background-color: rgb(255, 255, 255);
                width: ${pageWidth * scale}px !important;
                height: ${pageHeight * scale}px !important;
              }
            }
          }
        }

        .react-pdf__Toolbar {
          font-family: sans-serif;
          padding: var(--react-pdf__toolbar-padding);
          background-color: var(--react-pdf__toolbar-background);
          color: var(--react-pdf__toolbar-color);
          font-size: var(--react-pdf__toolbar-font-size);
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
