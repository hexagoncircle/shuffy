import { CSSProperties, ChangeEvent, useContext, useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { CardDataProps } from "@contexts/CardsContext";
import { CategoriesContext, CategoryProps } from "@/contexts/CategoriesContext";
import CardEditForm from "@components/CardEditForm";
import ShuffyFace from "@assets/shuffy-face.svg?react";
import "@css/card.css";
import clsx from "clsx";

export interface CardProps {
  card: CardDataProps;
  onDelete?(id: string): void;
  onUpdate?(card: CardDataProps): void;
}

export default function Card({ card, onDelete, onUpdate }: CardProps) {
  const { name, category, isActive } = card;
  const categories = useContext<CategoryProps[]>(CategoriesContext);
  const theme = categories.find(category => category.label === card.category)?.theme;
  // const ref = useClickAway<HTMLElement>(() => setIsEditing(false));
  // const nameRef = useRef<HTMLButtonElement>(null);
  // const [isEditing, setIsEditing] = useState(false);

  // const handleIsActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   onUpdate({
  //     ...card,
  //     isActive: e.target.checked,
  //   });
  // };

  // const handleUpdate = (card: CardDataProps) => {
  //   onUpdate(card);
  //   setIsEditing(false);
  // };

  return (
    // <article ref={ref} className="card | cluster">
    //   {isEditing ? (
    //     <CardEditForm
    //       card={card}
    //       onUpdate={handleUpdate}
    //       onDelete={onDelete}
    //       onCancel={() => setIsEditing(false)}
    //     />
    //   ) : (
    //     <>
    //       <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
    //       <button ref={nameRef} className="card-name" onClick={() => setIsEditing(true)}>
    //         {name}
    //       </button>
    //       <div>{category}</div>
    //     </>
    //   )}
    // </article>
    <article
      className={clsx("card", isActive && "active")}
      style={{ "--theme": theme } as CSSProperties}
    >
      <div className="card-display">
        <figure className="card-face">
          <ShuffyFace />
        </figure>
        {category && <div className="card-category">{category}</div>}
        <h2 className="card-name">{name}</h2>
      </div>
    </article>
  );
}
