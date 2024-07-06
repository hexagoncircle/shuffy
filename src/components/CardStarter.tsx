import PlusIcon from "@assets/plus.svg?react";
import { CSSProperties } from "react";

export default function CardStarter() {
  return (
    <article className="card card-starter stack center-xy">
      <img src="card-dashed.svg" width="329" height="446" alt="" />
      <div className="center flow" style={{ "--max": "15ch" } as CSSProperties}>
        <button className="icon-button action raised">
          <PlusIcon />
        </button>
        <p>Add a card to get shuffy-ing</p>
      </div>
    </article>
  );
}
