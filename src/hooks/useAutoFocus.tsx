import { useCallback, useRef } from "react";

export const useAutoFocus = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const didMount = useRef(false);

  const callbackRef = useCallback((node: T | null) => {
    if (node) {
      ref.current = node;

      if (didMount.current) {
        node.focus();
      } else {
        didMount.current = true;
      }
    }
  }, []);

  return callbackRef;
};
