import { useContext } from "react";

import { frameContext } from "../context";
import { ActionTypes } from "../state";

export function useFrameHeight() {
  const { state, dispatch } = useContext(frameContext);

  return {
    frameHeight: state.frameHeight,
    setFrameHeight: (node: HTMLElement) => {
      dispatch({
        type: ActionTypes.SET_FRAME_WIDTH,
        payload: node.offsetHeight,
      });
    },
  };
}
