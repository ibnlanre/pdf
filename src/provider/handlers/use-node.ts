import { useContext } from "react";

import { frameContext } from "../context";
import { ActionTypes } from "../state";

export function useNode() {
  const { state, dispatch } = useContext(frameContext);

  return {
    node: state.node,
    setNode: (node: HTMLElement) => {
      dispatch({
        type: ActionTypes.SET_NODE,
        payload: node,
      });
    },
  };
}
