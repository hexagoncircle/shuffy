import { ChangeEvent, useRef, useState } from "react";
import EditCardForm from "./EditCardForm";
import "@css/Card.css";
import { useClickAway } from "@uidotdev/usehooks";

export interface CardDataProps {
  id: string;
  name: string;
  isActive: boolean;
  category: string;
}

export interface CardProps {
  card: CardDataProps;
  onUpdate(card: CardDataProps): void;
  onDelete(id: string): void;
  setIsActive(id: string): void;
}

export default function Card({ card, onUpdate, onDelete }: CardProps) {
  const ref = useClickAway<HTMLElement>(() => setIsEditing(false));
  const nameRef = useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { name, category, isActive } = card;

  const handleIsActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...card,
      isActive: e.target.checked,
    });
  };

  const handleUpdate = (card: CardDataProps) => {
    onUpdate(card);
    setIsEditing(false);
  };

  return (
    <article ref={ref} tabIndex={-1} className="card | cluster">
      {isEditing ? (
        <EditCardForm
          card={card}
          onUpdate={handleUpdate}
          onDelete={onDelete}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
          <button ref={nameRef} className="card-name" onClick={() => setIsEditing(true)}>
            {name}
          </button>
          <div>{category}</div>
        </>
      )}
    </article>
  );
}
