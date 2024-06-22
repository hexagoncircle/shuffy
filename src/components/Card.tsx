import { useEffect, useRef, useState } from "react";
import EditCardForm from "./EditCardForm";
import "@css/Card.css";
import { useClickAway } from "@uidotdev/usehooks";

export interface CardDataProps {
  id: string;
  name: string;
  isActive: boolean;
  category: string;
}

export interface CardProps extends CardDataProps {
  updateCard(card: CardDataProps): void;
  deleteCard(id: string): void;
  setIsActive(id: string): void;
}

export default function Card({
  id,
  name,
  category,
  isActive,
  setIsActive,
  updateCard,
  deleteCard,
}: CardProps) {
  const ref = useClickAway<HTMLElement>(() => setIsEditing(false));
  const nameRef = useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (card: CardDataProps) => {
    updateCard(card);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!nameRef.current || isEditing) return;

    nameRef.current.focus();
  }, [isEditing]);

  return (
    <article ref={ref} tabIndex={-1} className="card | cluster">
      {isEditing ? (
        <EditCardForm
          id={id}
          name={name}
          category={category}
          isActive={isActive}
          updateCard={handleUpdate}
          deleteCard={deleteCard}
          cancelUpdate={() => setIsEditing(false)}
        />
      ) : (
        <>
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(id)} />
          <button ref={nameRef} className="card-name" onClick={() => setIsEditing(true)}>
            {name}
          </button>
          <div>{category}</div>
        </>
      )}
    </article>
  );
}
