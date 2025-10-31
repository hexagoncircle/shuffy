import { RefObject, useEffect, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

interface UseDraggableProps {
  containerRef: RefObject<HTMLElement | null>;
  onDragEnd?(data: number[]): void;
  dragHandle?: string;
}

gsap.registerPlugin(Flip)

const useDraggable = ({ containerRef, onDragEnd, dragHandle }: UseDraggableProps) => {
  const [draggableItems, setDraggableItems] = useState<HTMLElement[]>([]);
  const [isDragOutsideContainer, setIsDragOutsideContainer] = useState(false);
  const dragClassName = "is-dragging";
  const dragTargetAttr = "drag-target";
  const dragIndexAttr = "data-drag-index";
  const flipAttr = "flip";

  const { contextSafe } = useGSAP({ scope: containerRef });

  const updateDragIndexes = (els: HTMLElement[]) => {
    els.forEach((el, index) => {
      el.setAttribute(dragIndexAttr, String(index));
    });
  }

  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement;

    target.classList.add(dragClassName);
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("text/plain", target.getAttribute(dragIndexAttr) || "");
    setIsDragOutsideContainer(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    const container = containerRef.current;

    if (!container) return;

    target.classList.remove(dragClassName);

    const items = [...container.children] as HTMLElement[];
    const reorderedIndexes = items.map((el) => Number(el.getAttribute(dragIndexAttr)));

    updateDragIndexes(items);
    setDraggableItems(items);
    onDragEnd?.(reorderedIndexes);
  };

  const handleDragOver = contextSafe((e: DragEvent) => {
    e.preventDefault();
    const container = containerRef.current;

    if (!container) return;

    setIsDragOutsideContainer(false);

    const dragging = container.querySelector(`.${dragClassName}`) as HTMLElement;

    if (!dragging) {
      return;
    };

    const target = e.target as HTMLElement;
    const currentTarget = target.closest(`[${dragTargetAttr}]`) as HTMLElement;

    if (!currentTarget || currentTarget === dragging || currentTarget.hasAttribute(flipAttr)) {
      return;
    };

    const state = Flip.getState(draggableItems);

    const draggingIndex = draggableItems.indexOf(dragging);
    const targetIndex = draggableItems.indexOf(currentTarget);

    if (draggingIndex < targetIndex) {
      container.insertBefore(dragging, currentTarget.nextSibling);
    } else {
      container.insertBefore(dragging, currentTarget);
    }

    // Prevent dragover updates while animating positions
    currentTarget.setAttribute(flipAttr, "");

    Flip.from(state, {
      targets: draggableItems,
      duration: 0.3,
      ease: "power4.out",
      onComplete: () => {
        const items = [...container.children] as HTMLElement[];

        updateDragIndexes(items);
        setDraggableItems(items);
        currentTarget.removeAttribute(flipAttr);
      }
    })
  });

  const handleDragLeave = (e: DragEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOutsideContainer(true);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const draggableItems = [...container.children] as HTMLElement[];

    draggableItems.forEach((el, index) => {
      el.draggable = true;
      el.setAttribute(dragIndexAttr, String(index));
      el.setAttribute(dragTargetAttr, "");
      el.addEventListener("dragstart", handleDragStart);
      el.addEventListener("dragend", handleDragEnd);
    });

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragLeave);

    return () => {
      draggableItems.forEach((el) => {
        el.draggable = false;
        el.removeAttribute(dragIndexAttr);
        el.removeAttribute(dragTargetAttr);
        el.removeEventListener("dragstart", handleDragStart);
        el.removeEventListener("dragend", handleDragEnd);
      });

      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragleave", handleDragLeave);
    };
  }, [containerRef, onDragEnd, draggableItems, isDragOutsideContainer]);

  // Check if drag leaves boundaries of container
  useEffect(() => {
    // const container = containerRef.current;

    // if (container && isDragOutsideContainer) {

    //   const state = Flip.getState(draggableItems);
    //   const fragment = document.createDocumentFragment();

    //   draggableItems.forEach((el) => {
    //     fragment.appendChild(el);
    //   });

    //   container.appendChild(fragment);

    //   Flip.from(state, {
    //     targets: draggableItems,
    //     duration: 0.3,
    //     ease: "power3.out",
    //   })
    // }
  }, [containerRef, isDragOutsideContainer]);
};

export default useDraggable;
