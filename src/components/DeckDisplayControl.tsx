import { useEffect, useState } from "react";
import StackIcon from "@assets/cards-stack.svg?react"
import ListIcon from "@assets/list-dashes.svg?react"
import "@css/deck-display-control.css";

export type DeckDisplayControlView = "stack" | "list"

interface DeckDisplayControlProps {
  defaultView?: DeckDisplayControlView;
  onClick(value: string): void;
}


export default function DeckDisplayControl({ defaultView, onClick }: DeckDisplayControlProps) {
  const [selected, setSelected] = useState<DeckDisplayControlView>(defaultView || "stack");

  const handleClick = (view: DeckDisplayControlView) => {
    setSelected(view);
    onClick(view)
  }

  return (
    <div className="deck-display-control">
      <h3 className="visually-hidden">Deck presentation</h3>
      <button className="small" aria-pressed={selected === "stack"} onClick={() => handleClick('stack')}>
        <span className="visually-hidden">Stack view</span>
        <StackIcon aria-hidden="true" />
      </button>
      <button className="small" aria-pressed={selected === "list"} onClick={() => handleClick('list')}>
        <span className="visually-hidden">List view</span>
        <ListIcon aria-hidden="true" />
      </button>
    </div >
  )
}