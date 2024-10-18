import { useContext } from "react";

import { frameContext } from "../context";
import { ActionTypes } from "../state";

export function useActivePage() {
  const { state, dispatch } = useContext(frameContext);

  return {
    activePage: state.activePage,
    setActivePage: (node: HTMLElement) => {
      dispatch({
        type: ActionTypes.SET_ACTIVE_PAGE,
        payload: node.offsetHeight,
      });
    },
  };
}
