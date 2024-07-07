import PlusIcon from "@assets/plus.svg?react";
import { forwardRef } from "react";

interface CategoryStarterProps {
  onClick(): void;
}

const CategoryStarter = forwardRef<HTMLButtonElement, CategoryStarterProps>(({ onClick }, ref) => {
  return (
    <article className="category-starter stack center-xy">
      <img src="category-dashed.svg" width="331" height="65" alt="" />
      <div className="category-starter-content cluster">
        <button ref={ref} className="icon-button action small" onClick={onClick}>
          <PlusIcon />
        </button>
        <p>Add a category</p>
      </div>
    </article>
  );
})

export default CategoryStarter
