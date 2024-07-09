import { CSSProperties, useContext } from "react";
import clsx from "clsx";
import { CardDataProps } from "@components/CardsContext";
import ShuffyFace from "@assets/shuffy-face.svg?react";
import Blot from "@assets/card-blot.svg?react";
import { CategoriesContext } from "@components/CategoriesContext";
import "@css/card.css";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export interface CardProps {
  card: CardDataProps;
  flipped?: boolean;
  onClick?(card: CardDataProps): void;
}

export default function Card({ card, flipped, onClick }: CardProps) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
  });
  const { categories } = useContext(CategoriesContext);
  const { label, category, isActive } = card;
  const categoryObj = categories.find(c => c.id === category);
  const theme = categoryObj?.theme;
  const categoryLabel = categoryObj?.label;

  return (
    <article
      ref={ref}
      className={clsx("card stack", entry?.isIntersecting && "in-view", isActive && "active", flipped && "flipped")}
      style={{ "--theme": theme } as CSSProperties}
    >
      <button className="card-front" onClick={() => onClick?.(card)}>
        <div className="card-display">
          <figure className="card-figure stack" aria-hidden="true">
            <Blot className="card-blot" />
            <ShuffyFace className="card-face" />
          </figure>
          {categoryLabel && <div className="card-category">{categoryLabel}</div>}
          <h2 className="card-name">{label}</h2>
        </div>
      </button>

      <section className="card-back">
        <img src="card-back.svg" width="462" height="615" alt="" />
      </section>
    </article>
  );
}
