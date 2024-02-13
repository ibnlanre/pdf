export const MINIMUM_SCALE = 0.25;
export const MAXIMUM_SCALE = 2.5;

type FrameStateAction = {
  loading: {
    type: "SET_LOADING";
    payload: boolean;
  };
  activePage: {
    type: "SET_ACTIVE_PAGE";
    payload: number;
  };
  pageInput: {
    type: "SET_PAGE_INPUT";
    payload: string;
  };
  numPages: {
    type: "SET_NUM_PAGES";
    payload: number;
  };
  scale: {
    type: "SET_SCALE";
    payload: number;
  };
  scaleInput: {
    type: "SET_SCALE_INPUT";
    payload: string;
  };
  frame_width: {
    type: "SET_FRAME_WIDTH";
    payload: number;
  };
  frame_height: {
    type: "SET_FRAME_HEIGHT";
    payload: number;
  };
  page_width: {
    type: "SET_PAGE_WIDTH";
    payload: number;
  };
  page_height: {
    type: "SET_PAGE_HEIGHT";
    payload: number;
  };
  node: {
    type: "SET_NODE";
    payload: HTMLDivElement | null;
  };
};

type FrameKeys = keyof FrameStateAction;
type FrameState = {
  [K in FrameKeys]: FrameStateAction[K]["payload"];
};

type FrameAction = FrameStateAction[FrameKeys];

export const initialFrameState = {
  loading: true,
  activePage: 1,
  pageInput: "1",
  scaleInput: "100%",
  numPages: 1,
  scale: 1,
  frame_width: 0,
  frame_height: 0,
  page_width: 0,
  page_height: 0,
  node: null,
} satisfies FrameState;

export function reducer(state: FrameState, action: FrameAction) {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: payload };
    case "SET_PAGE_INPUT":
      return { ...state, pageInput: payload };
    case "SET_NUM_PAGES":
      return { ...state, numPages: payload };
    case "SET_SCALE":
      return { ...state, scale: payload };
    case "SET_SCALE_INPUT":
      return { ...state, scaleInput: payload };
    case "SET_FRAME_WIDTH":
      return { ...state, frame_width: payload };
    case "SET_FRAME_HEIGHT":
      return { ...state, frame_height: payload };
    case "SET_PAGE_WIDTH":
      return { ...state, page_width: payload };
    case "SET_PAGE_HEIGHT":
      return { ...state, page_height: payload };
    case "SET_NODE":
      return { ...state, node: payload };
    default:
      return state;
  }
}
