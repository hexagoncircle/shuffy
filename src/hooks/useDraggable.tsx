import { RefObject, useEffect, useState } from "react";

const useDraggable = (containerRef: RefObject<HTMLElement | null>, onDragEnd: (data: number[]) => void) => {
  const [initialChildren, setInitialChildren] = useState<HTMLElement[]>([]);
  const [isDragOutsideContainer, setIsDragOutsideContainer] = useState(false);
  const dragClassName = "is-dragging";

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    setInitialChildren([...container.children] as HTMLElement[]);
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;

      target.classList.add(dragClassName);
      e.dataTransfer!.effectAllowed = "move";
      e.dataTransfer!.setData("text/plain", target.dataset.index!);
      setIsDragOutsideContainer(false);
    };

    const handleDragEnd = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      const sortedChildren = [...container.children] as HTMLElement[];

      target.classList.remove(dragClassName);

      if (!isDragOutsideContainer) {
        const reorderedData = sortedChildren.map((el) => Number(el.dataset.index));

        onDragEnd(reorderedData);
        setInitialChildren(sortedChildren);
      }

      // Reset data-index values to match new order
      sortedChildren.forEach((el, index) => {
        el.setAttribute("data-index", String(index));
      });
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOutsideContainer(false);

      const dragging = container.querySelector(`.${dragClassName}`);

      if (!dragging) return;

      const target = e.target as HTMLElement;
      const currentTarget = target.closest("[data-drag-target]");

      if (!currentTarget || currentTarget === dragging) return;

      const currentChildren = [...container.children];
      const draggingIndex = currentChildren.indexOf(dragging);
      const targetIndex = currentChildren.indexOf(currentTarget);

      if (draggingIndex < targetIndex) {
        container.insertBefore(dragging, currentTarget.nextSibling);
      } else {
        container.insertBefore(dragging, currentTarget);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        setIsDragOutsideContainer(true);
      }
    };

    initialChildren.forEach((el, index) => {
      el.draggable = true;
      el.setAttribute("data-drag-target", "");
      el.setAttribute("data-index", String(index));
      el.addEventListener("dragstart", handleDragStart);
      el.addEventListener("dragend", handleDragEnd);
    });

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragLeave);

    return () => {
      initialChildren.forEach((el) => {
        el.draggable = false;
        el.removeAttribute("data-drag-target");
        el.removeAttribute("data-index");
        el.removeEventListener("dragstart", handleDragStart);
        el.removeEventListener("dragend", handleDragEnd);
      });

      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragleave", handleDragLeave);
    };
  }, [containerRef, onDragEnd, initialChildren, isDragOutsideContainer]);

  // Check if drag leaves boundaries of container
  useEffect(() => {
    if (isDragOutsideContainer && initialChildren.length > 0) {
      const container = containerRef.current;

      if (container) {
        initialChildren.forEach((el) => {
          container.appendChild(el);
        });
      }
    }
  }, [containerRef, initialChildren, isDragOutsideContainer]);
};

export default useDraggable;
