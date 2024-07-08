import PlusIcon from "@assets/plus.svg?react";
import { forwardRef } from "react";

interface CategoryStarterProps {
  onClick(): void;
}

const CategoryStarter = forwardRef<HTMLButtonElement, CategoryStarterProps>(({ onClick }, ref) => {
  return (
    <article className="category-starter stack center-xy">
      <img src="category-dashed.svg" width="331" height="65" alt="" />
      <button ref={ref} type="button" className="category-starter-button" onClick={onClick}>
        <div className="category-starter-content cluster">
          <div className="button icon-button action small">
            <PlusIcon />
          </div>
          <p>Add a category</p>
        </div>
      </button>
    </article>
  );
})

export default CategoryStarter
