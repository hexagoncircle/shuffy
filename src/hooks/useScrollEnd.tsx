import { useEffect, useRef } from "react";

/** Handle scrollend events for browsers that don't support it. */
export function useScrollEnd(
  callback: () => void,
  ref?: React.RefObject<HTMLElement | null>,
  delay = 100
) {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const target = ref?.current;

    if (!target) return;

    if ("onscrollend" in window) {
      target.addEventListener("scrollend", callback);
      return () => target.removeEventListener("scrollend", callback);
    }

    const handleScroll = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(callback, delay);
    };

    target.addEventListener("scroll", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [callback, ref, delay]);
}
