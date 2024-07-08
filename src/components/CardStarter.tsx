import PlusIcon from "@assets/plus.svg?react";
import clsx from "clsx";
import { CSSProperties } from "react";

interface CardStarterProps {
  className?: string;
  onClick(): void;
}

export default function CardStarter({ className, onClick }: CardStarterProps) {
  return (
    <article className={clsx("card card-starter stack center-xy", className)}>
      <img src="card-dashed.svg" width="329" height="446" alt="" />
      <div className="center flow" style={{ "--max": "10ch" } as CSSProperties}>
        <button className="icon-button action raised center" onClick={onClick}>
          <PlusIcon />
        </button>
        <p>Add a card to get shuffy-ing</p>
      </div>
    </article>
  );
}
