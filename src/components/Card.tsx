import { CSSProperties, useContext } from "react";
import { CardDataProps } from "@components/CardsContext";
import ShuffyFace from "@assets/shuffy-face.svg?react";
import Blot from "@assets/card-blot.svg?react";
import "@css/card.css";
import clsx from "clsx";
import { CategoriesContext } from "@components/CategoriesContext";

export interface CardProps {
  card: CardDataProps;
  flipped?: boolean;
  onDelete?(id: string): void;
  onUpdate?(card: CardDataProps): void;
}

export default function Card({ card, flipped }: CardProps) {
  const { label, category, isActive } = card;
  const { categories } = useContext(CategoriesContext);
  const cardCategory = categories.find(c => c.id === category);
  const theme = cardCategory?.theme;
  const categoryLabel = cardCategory?.label;

  return (
    <article
      className={clsx("card stack", isActive && "active", flipped && "flipped")}
      style={{ "--theme": theme } as CSSProperties}
    >
      <section className="card-front">
        <div className="card-display">
          <figure className="card-figure stack">
            <Blot className="card-blot" />
            <ShuffyFace className="card-face" />
          </figure>
          {categoryLabel && <div className="card-category">{categoryLabel}</div>}
          <h2 className="card-name">{label}</h2>
        </div>
      </section>

      <section className="card-back">
        <img src="card-back.svg" width="462" height="615" alt="" />
      </section>
    </article>
  );
}
