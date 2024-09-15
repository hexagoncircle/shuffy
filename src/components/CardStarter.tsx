import { CSSProperties, forwardRef } from "react";
import PlusIcon from "@assets/plus.svg?react";
import clsx from "clsx";

interface CardStarterProps {
  className?: string;
  onClick(): void;
}

const CardStarter = forwardRef<HTMLButtonElement, CardStarterProps>(({ className, onClick }, ref) => {
  return (
    <article className={clsx("card card-starter stack center-xy", className)}>
      <img src="card-dashed.svg" width="329" height="446" alt="" />
      <div className="center flow" style={{ "--max": "10ch" } as CSSProperties}>
        <button ref={ref} className="icon-button action raised center" onClick={onClick}>
          <PlusIcon />
        </button>
        <p>Add a card to get shuffy-ing</p>
      </div>
    </article>
  );
})

export default CardStarter