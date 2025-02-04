import { CSSProperties, forwardRef } from "react";
import clsx from "clsx";
import { CardDataProps } from "@contexts/CardsContext";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import ShuffyFace from "@assets/shuffy-face.svg?react";
import ShuffyFaceInactive from "@assets/shuffy-face-sleep.svg?react";
import Blot from "@assets/card-blot.svg?react";
import "@css/card.css";

export interface CardProps {
  className?: string;
  card: CardDataProps;
  flipped?: boolean;
  selected?: boolean;
  onClick?(): void;
}

const Card = forwardRef<HTMLButtonElement, CardProps>(({ card, flipped, selected, className, onClick }, ref) => {
  const { categories } = useCategoriesContext();
  const { id, label, category, isActive } = card;
  const categoryObj = categories.find(c => c.id === category);
  const categoryLabel = categoryObj?.label;
  const theme = categoryObj?.theme;

  return (
    <article
      id={id}
      className={clsx(
        "card stack",
        !isActive && "inactive",
        flipped && "flipped",
        theme && "has-theme",
        className)}
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
            {isActive
              ? <ShuffyFace className="card-face" />
              : <ShuffyFaceInactive className="card-face" />
            }
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