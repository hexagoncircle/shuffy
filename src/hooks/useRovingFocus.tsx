import { useCallback, useEffect, useRef, useState } from "react";

type Orientation = "horizontal" | "vertical";

interface UseRovingFocusOptions {
  orientation?: Orientation;
  loop?: boolean;
  initialIndex?: number; // default 0
}

export function useRovingFocus<T extends HTMLElement>({
  orientation = "horizontal",
  loop = true,
  initialIndex = 0,
}: UseRovingFocusOptions = {}) {
  const rovingFocusContainerRef = useRef<T | null>(null);
  const [items, setItems] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const hasUserNavigatedRef = useRef(false); // focus only after arrow keys

  // Collect items
  const collectItems = useCallback(() => {
    if (!rovingFocusContainerRef.current) return;
    const focusable = Array.from(
      rovingFocusContainerRef.current.querySelectorAll<HTMLElement>(
        "[data-rf-item]"
      )
    );
    setItems(focusable);
  }, []);

  useEffect(() => {
    collectItems();
  }, [collectItems]);

  // Update tabIndex so that initialIndex item is tabbable on mount
  useEffect(() => {
    items.forEach((el, i) => {
      el.tabIndex = i === currentIndex ? 0 : -1;
    });
  }, [items, currentIndex]);

  // Arrow key navigation
  const rovingFocusOnKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!items.length) return;

      const horizontal = orientation === "horizontal";
      const prevKey = horizontal ? "ArrowLeft" : "ArrowUp";
      const nextKey = horizontal ? "ArrowRight" : "ArrowDown";

      if (e.key === prevKey) {
        e.preventDefault();
        hasUserNavigatedRef.current = true;
        setCurrentIndex((idx) => {
          const next = idx - 1;
          return next < 0 ? (loop ? items.length - 1 : idx) : next;
        });
      }

      if (e.key === nextKey) {
        e.preventDefault();
        hasUserNavigatedRef.current = true;
        setCurrentIndex((idx) => {
          const next = idx + 1;
          return next >= items.length ? (loop ? 0 : idx) : next;
        });
      }
    },
    [items, orientation, loop]
  );

  // Focus only after arrow key navigation
  useEffect(() => {
    if (!hasUserNavigatedRef.current) return;
    const el = items[currentIndex];
    if (el) {
      el.focus();
      el.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "instant",
      });
    }
  }, [currentIndex, items]);

  const rovingFocusItemProps = { "data-rf-item": "" };

  return {
    rovingFocusContainerRef,
    rovingFocusOnKeyDown,
    rovingFocusItemProps,
    currentIndex,
  };
}
