export const MINIMUM_SCALE = 0.25;
export const MAXIMUM_SCALE = 2.5;

export enum ActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE",
  SET_PAGE_INPUT = "SET_PAGE_INPUT",
  SET_NUM_PAGES = "SET_NUM_PAGES",
  SET_SCALE = "SET_SCALE",
  SET_SCALE_INPUT = "SET_SCALE_INPUT",
  SET_FRAME_WIDTH = "SET_FRAME_WIDTH",
  SET_FRAME_HEIGHT = "SET_FRAME_HEIGHT",
  SET_PAGE_WIDTH = "SET_PAGE_WIDTH",
  SET_PAGE_HEIGHT = "SET_PAGE_HEIGHT",
  SET_NODE = "SET_NODE",
}

type FrameStateAction = {
  loading: {
    type: ActionTypes.SET_LOADING;
    payload: boolean;
  };
  activePage: {
    type: ActionTypes.SET_ACTIVE_PAGE;
    payload: number;
  };
  pageInput: {
    type: ActionTypes.SET_PAGE_INPUT;
    payload: string;
  };
  numPages: {
    type: ActionTypes.SET_NUM_PAGES;
    payload: number;
  };
  scale: {
    type: ActionTypes.SET_SCALE;
    payload: number;
  };
  scaleInput: {
    type: ActionTypes.SET_SCALE_INPUT;
    payload: string;
  };
  frameWidth: {
    type: ActionTypes.SET_FRAME_WIDTH;
    payload: number;
  };
  frameHeight: {
    type: ActionTypes.SET_FRAME_HEIGHT;
    payload: number;
  };
  pageWidth: {
    type: ActionTypes.SET_PAGE_WIDTH;
    payload: number;
  };
  pageHeight: {
    type: ActionTypes.SET_PAGE_HEIGHT;
    payload: number;
  };
  node: {
    type: ActionTypes.SET_NODE;
    payload: HTMLDivElement | null;
  };
};

export type FrameAttribute = keyof FrameStateAction;
export type FrameAction = FrameStateAction[FrameAttribute];
export type FrameState = {
  [Key in FrameAttribute]: FrameStateAction[Key]["payload"];
};

export const initialFrameState = {
  loading: true,
  activePage: 1,
  pageInput: "1",
  scaleInput: "100%",
  numPages: 1,
  scale: 1,
  frameWidth: 0,
  frameHeight: 0,
  pageWidth: 0,
  pageHeight: 0,
  node: null,
} satisfies FrameState;

export function reducer(state: FrameState, action: FrameAction) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: payload };
    case ActionTypes.SET_ACTIVE_PAGE:
      return { ...state, activePage: payload };
    case ActionTypes.SET_PAGE_INPUT:
      return { ...state, pageInput: payload };
    case ActionTypes.SET_NUM_PAGES:
      return { ...state, numPages: payload };
    case ActionTypes.SET_SCALE:
      return { ...state, scale: payload };
    case ActionTypes.SET_SCALE_INPUT:
      return { ...state, scaleInput: payload };
    case ActionTypes.SET_FRAME_WIDTH:
      return { ...state, frameWidth: payload };
    case ActionTypes.SET_FRAME_HEIGHT:
      return { ...state, frameHeight: payload };
    case ActionTypes.SET_PAGE_WIDTH:
      return { ...state, pageWidth: payload };
    case ActionTypes.SET_PAGE_HEIGHT:
      return { ...state, pageHeight: payload };
    case ActionTypes.SET_NODE:
      return { ...state, node: payload };
    default:
      return state;
  }
}
