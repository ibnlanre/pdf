import { useContext } from "react";

import { frameContext } from "../context";
import { ActionTypes } from "../state";

export function useFrameWidth() {
  const { state, dispatch } = useContext(frameContext);

  return {
    frameWidth: state.frameWidth,
    setFrameWidth: (node: HTMLElement) => {
      dispatch({
        type: ActionTypes.SET_FRAME_WIDTH,
        payload: node.offsetWidth,
      });
    },
  };
}
