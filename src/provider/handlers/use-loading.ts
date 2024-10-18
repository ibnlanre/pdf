import { useContext } from "react";

import { frameContext } from "../context";
import { ActionTypes } from "../state";

export function useLoading() {
  const { state, dispatch } = useContext(frameContext);

  return {
    loading: state.loading,
    setLoading: (loading: boolean) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },
  };
}
