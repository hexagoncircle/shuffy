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
  const [initialChildren, setInitialChildren] = useState<HTMLElement[]>([]);
  const [isDragOutsideContainer, setIsDragOutsideContainer] = useState(false);
  const dragClassName = "is-dragging";
  const dragTargetAttr = "drag-target";
  const flipAttr = "flip";

  const { contextSafe } = useGSAP({ scope: containerRef });

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

      if (onDragEnd && !isDragOutsideContainer) {
        const reorderedData = sortedChildren.map((el) => Number(el.dataset.index));

        onDragEnd(reorderedData);
        setInitialChildren(sortedChildren);
      }

      // Reset data-index values to match new order
      sortedChildren.forEach((el, index) => {
        el.setAttribute("data-index", String(index));
      });
    };

    const handleDragOver = contextSafe((e: DragEvent) => {
      e.preventDefault();
      setIsDragOutsideContainer(false);

      const dragging = container.querySelector(`.${dragClassName}`);

      if (!dragging) return;

      const target = e.target as HTMLElement;
      const currentTarget = target.closest(`[${dragTargetAttr}]`);

      if (!currentTarget || currentTarget === dragging || currentTarget.hasAttribute(flipAttr)) return;

      const state = Flip.getState(initialChildren);

      const currentChildren = [...container.children];
      const draggingIndex = currentChildren.indexOf(dragging);
      const targetIndex = currentChildren.indexOf(currentTarget);

      if (draggingIndex < targetIndex) {
        container.insertBefore(dragging, currentTarget.nextSibling);
      } else {
        container.insertBefore(dragging, currentTarget);
      }

      // Prevent dragover updates while animating positions
      currentTarget.setAttribute(flipAttr, "");

      Flip.from(state, {
        targets: currentChildren,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          currentTarget.removeAttribute(flipAttr);
        }
      })
    });

    const handleDragLeave = (e: DragEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        setIsDragOutsideContainer(true);
      }
    };

    initialChildren.forEach((el, index) => {
      el.draggable = true;
      el.setAttribute("data-index", String(index));
      el.setAttribute(dragTargetAttr, "");
      el.addEventListener("dragstart", handleDragStart);
      el.addEventListener("dragend", handleDragEnd);
    });

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragLeave);

    return () => {
      initialChildren.forEach((el) => {
        el.draggable = false;
        el.removeAttribute("data-index");
        el.removeAttribute(dragTargetAttr);
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
        const state = Flip.getState(initialChildren);

        initialChildren.forEach((el) => {
          container.appendChild(el);
        });

        Flip.from(state, {
          targets: initialChildren,
          duration: 0.3,
          ease: "power3.out",
        })
      }
    }
  }, [containerRef, initialChildren, isDragOutsideContainer]);
};

export default useDraggable;
