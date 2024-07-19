import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'gsap/Draggable';
import { gsap } from 'gsap';

interface SortableItem {
  id: string;
  content: string;
}

const rowSize = 100; // => container height / number of items

const useSortableList = (initialItems: SortableItem[]): React.RefObject<HTMLDivElement> => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(initialItems);
  const sortablesRef = useRef<Sortable[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const listItems = Array.from(container.querySelectorAll<HTMLDivElement>('.list-item'));
      sortablesRef.current = listItems.map((element, index) =>
        Sortable(element, index, sortablesRef, setItems)
      );

      gsap.to(container, 0.5, { autoAlpha: 1 });

      // Clean up on unmount
      return () => {
        sortablesRef.current.forEach((sortable) => sortable.dragger.kill());
      };
    }
  }, [items]);

  return containerRef;
};

interface Sortable {
  dragger: Draggable;
  element: HTMLDivElement;
  index: number;
  setIndex: (index: number) => void;
}

function Sortable(
  element: HTMLDivElement,
  index: number,
  sortablesRef: React.RefObject<Sortable[]>,
  setItems: React.Dispatch<React.SetStateAction<SortableItem[]>>
): Sortable {
  const content = element.querySelector<HTMLDivElement>('.item-content');
  const order = element.querySelector<HTMLDivElement>('.order');

  const animation = gsap.to(content, 0.3, {
    boxShadow: 'rgba(0,0,0,0.2) 0px 16px 32px 0px',
    force3D: true,
    scale: 1.1,
    paused: true,
  });

  const dragger = new Draggable(element, {
    onDragStart: downAction,
    onRelease: upAction,
    onDrag: dragAction,
    cursor: 'inherit',
    type: 'y',
  });

  const sortable: Sortable = {
    dragger: dragger,
    element: element,
    index: index,
    setIndex: setIndex,
  };

  gsap.set(element, { y: index * rowSize });

  function setIndex(index: number) {
    sortable.index = index;
    if (order) {
      order.textContent = (index + 1).toString();
    }

    if (!dragger.isDragging) layout();
  }

  function downAction() {
    animation.play();
    this.update();
  }

  function dragAction(this: Draggable) {
    const index = clamp(Math.round(this.y / rowSize), 0, sortablesRef.current.length - 1);
    if (index !== sortable.index) {
      changeIndex(sortable, index, sortablesRef, setItems);
    }
  }

  function upAction() {
    animation.reverse();
    layout();
  }

  function layout() {
    gsap.to(element, 0.3, { y: sortable.index * rowSize });
  }

  return sortable;
}

function changeIndex(
  item: Sortable,
  to: number,
  sortablesRef: React.RefObject<Sortable[]>,
  setItems: React.Dispatch<React.SetStateAction<SortableItem[]>>
) {
  const sortables = sortablesRef.current;
  arrayMove(sortables, item.index, to);

  setItems((prevItems) => {
    const newItems = [...prevItems];
    arrayMove(newItems, item.index, to);
    return newItems;
  });

  sortables.forEach((sortable, index) => sortable.setIndex(index));
}

function arrayMove<T>(array: T[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

function clamp(value: number, a: number, b: number) {
  return value < a ? a : value > b ? b : value;
}

export default useSortableList;
