import PlusIcon from "@assets/plus.svg?react";
import { CSSProperties } from "react";

export default function CategoryStarter() {
  return (
    <article className="category-starter stack center-xy">
      <img src="category-dashed.svg" width="331" height="65" alt="" />
      <div className="category-starter-content cluster">
        <button className="icon-button action small">
          <PlusIcon />
        </button>
        <p>Add a category</p>
      </div>
    </article>
  );
}
