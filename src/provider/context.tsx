import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { FrameAction, FrameState, initialFrameState, reducer } from "./state";

const initialFrameContext = {
  state: initialFrameState,
  dispatch: () => null,
};

export const frameContext = createContext<{
  state: FrameState;
  dispatch: Dispatch<FrameAction>;
}>(initialFrameContext);

export function FrameContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialFrameState);

  return (
    <frameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </frameContext.Provider>
  );
}
