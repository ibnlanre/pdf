import { useContext } from "react";
import { frameContext } from "../context";

export function useLoading() {
  const { state, dispatch } = useContext(frameContext);
  return {
    loading: state.loading,
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", loading }),
  };
}
