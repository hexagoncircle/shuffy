import { ChangeEvent, useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import CardEditForm from "@components/CardEditForm";
import "@css/Card.css";

export interface CardDataProps {
  id: string;
  name: string;
  isActive: boolean;
  category: string;
}

export interface CardProps {
  card: CardDataProps;
  onDelete(id: string): void;
  onUpdate(card: CardDataProps): void;
}

export default function Card({ card, onDelete, onUpdate }: CardProps) {
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
    <article ref={ref} className="card | cluster">
      {isEditing ? (
        <CardEditForm
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
