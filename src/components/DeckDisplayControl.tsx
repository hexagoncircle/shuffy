import "@css/deck-display-control.css";
import { useEffect, useState } from "react";
import StackIcon from "@assets/cards-stack.svg?react"
import ListIcon from "@assets/list-dashes.svg?react"

type DeckDisplayControlView = "stack" | "list"

interface DeckDisplayControlProps {
  defaultView?: DeckDisplayControlView;
  onUpdate?(value: string): void;
}


export default function DeckDisplayControl({ defaultView, onUpdate }: DeckDisplayControlProps) {
  const [selected, setSelected] = useState<DeckDisplayControlView>(defaultView || "list");

  useEffect(() => {
    onUpdate?.(selected);
  }, [selected, onUpdate])

  return (
    <div className="deck-display-control">
      <h3 className="visually-hidden">Deck presentation</h3>
      <button className="small" aria-pressed={selected === "stack"} onClick={() => setSelected('stack')}>
        <span className="visually-hidden">Stack view</span>
        <StackIcon aria-hidden="true" />
      </button>
      <button className="small" aria-pressed={selected === "list"} onClick={() => setSelected('list')}>
        <span className="visually-hidden">List view</span>
        <ListIcon aria-hidden="true" />
      </button>
    </div >
  )
}