import { useState, useEffect, useCallback, RefObject, KeyboardEvent } from 'react';

export default function useRovingTabIndex(parentRef: RefObject<Element>, selectedIndex: number) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const keys = {
    next: ["ArrowRight", "ArrowDown"],
    prev: ["ArrowUp", "ArrowLeft"]
  };

  const handleRovingIndex = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const focusableEls = parentRef.current?.querySelectorAll(focusableSelectors);

    if (![...keys.next, ...keys.prev].includes(e.key) || !focusableEls) return;

    e.preventDefault();

    let updatedIndex = currentIndex;

    if (keys.next.includes(e.key)) {
      updatedIndex = (currentIndex + 1) % focusableEls.length;
    } else if (keys.prev.includes(e.key)) {
      updatedIndex = (currentIndex - 1 + focusableEls.length) % focusableEls.length;
    }

    setCurrentIndex(updatedIndex);

    const selected = focusableEls[updatedIndex] as HTMLElement;

    selected.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'instant'
    });

    selected.focus();
  }, [currentIndex, keys.next, keys.prev, parentRef]);

  useEffect(() => {
    const focusableEls = parentRef.current?.querySelectorAll(focusableSelectors);

    if (!focusableEls) return;

    focusableEls.forEach((item, index) => {
      item.setAttribute('tabIndex', index === currentIndex ? "0" : "-1");
    });
  }, [currentIndex, parentRef]);

  return handleRovingIndex;
}