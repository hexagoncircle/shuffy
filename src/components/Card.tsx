import { CSSProperties, forwardRef, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardDataProps } from "@components/CardsContext";
import ShuffyFace from "@assets/shuffy-face.svg?react";
import Blot from "@assets/card-blot.svg?react";
import { CategoriesContext } from "@components/CategoriesContext";
import "@css/card.css";

export interface CardProps {
  card: CardDataProps;
  flipped?: boolean;
  selected?: boolean;
  onClick(): void;
}

const Card = forwardRef<HTMLButtonElement, CardProps>(({ card, flipped, selected, onClick }, ref) => {
  const { categories } = useContext(CategoriesContext);
  const { label, category, isActive } = card;
  const categoryObj = categories.find(c => c.id === category);
  const categoryLabel = categoryObj?.label;
  const theme = categoryObj?.theme;

  return (
    <article
      className={clsx("card stack", !isActive && "inactive", flipped && "flipped")}
      style={{ "--theme": theme } as CSSProperties}
    >
      <button
        ref={ref}
        className="card-front"
        aria-selected={selected}
        onClick={onClick}
      >
        <div className="card-display">
          <figure className="card-figure stack" aria-hidden="true">
            <Blot className="card-blot" />
            <ShuffyFace className="card-face" />
          </figure>
          {categoryLabel && <div className="card-category break-words">{categoryLabel}</div>}
          <h2 className="card-name break-words">{label}</h2>
        </div>
      </button>

      <section className="card-back">
        <img src="card-back.svg" width="462" height="615" alt="" />
      </section>
    </article>
  );
})

export default Card;