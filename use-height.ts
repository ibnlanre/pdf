import {
  CSSProperties,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

function useListener<K extends keyof WindowEventMap>(
  type: K,
  listener: () => void
) {
  const options = {
    passive: true,
  };
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener);
  }, []);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface UseHeight {
  height: CSSProperties["height"];
  width: CSSProperties["width"];
}

export function useHeight<D extends Element>(node: RefObject<D>): UseHeight {
  const [dimensions, setDimensions] = useState<UseHeight>({
    height: undefined,
    width: undefined,
  });

  const setSize = useCallback(() => {
    if (node.current) {
      const { top } = node.current.getBoundingClientRect();
      const { innerHeight, scrollY } = window;
      const windowHeight = Math.min(innerHeight, screen.availHeight);

      setDimensions({
        height: windowHeight - top - scrollY,
        width: window.innerWidth,
      });
    }
  }, [node]);

  useListener("resize", setSize);
  useListener("orientationchange", setSize);
  useIsomorphicLayoutEffect(setSize, []);

  return dimensions;
}
