import PlusIcon from "@assets/plus.svg?react";
import { CSSProperties } from "react";

export default function CategoryStarter() {
  return (
    <article className="category-starter dashbox stack center-xy">
      <div className="cluster">
        <button className="icon-button action small">
          <PlusIcon />
        </button>
        <p>Add a category</p>
      </div>
    </article>
  );
}
