import {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  RefObject,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import slugify from "slugify";
import mergeRefs from "merge-refs";
import { v4 as uuid } from "uuid";
import { useOnClickOutside } from "usehooks-ts";
import { useCategoriesContext } from "@hooks/useCategoriesContext";
import { useFocusTrap } from "@hooks/useFocusTrap";
import { getRandomValue } from "@js/utils";
import ColorPicker from "./ColorPicker";
import CategorySelectIcon from "@assets/category-select.svg?react";
import COLORS from "@data/colors.theme.json";

interface CategoryCreatorProps {
  onComplete(): void;
}

export default function CategoryCreator({ onComplete }: CategoryCreatorProps) {
  const { categories, createCategory } = useCategoriesContext();
  const [colorValue, setColorValue] = useState(getRandomValue(COLORS).value);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const slugifiedValue = slugify(inputValue, { lower: true });
  const isDuplicate = categories.find((c) => c.value === slugifiedValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useFocusTrap<HTMLElement>(true);
  const handleContainerKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onComplete();
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value && !isDuplicate) {
        handleSave();
        onComplete();
      }
    }
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSave = () => {
    if (isDuplicate) return;

    createCategory({
      id: uuid(),
      theme: colorValue,
      label: inputValue,
      value: slugifiedValue,
    });
    onComplete();
  };

  useOnClickOutside(
    containerRef as RefObject<HTMLElement>,
    () => {
      onComplete();
    },
    "mouseup"
  );

  return (
    <div
      ref={mergeRefs(containerRef, focusTrapRef) as React.Ref<HTMLDivElement>}
      className="category-creator category box"
      style={{ "--theme": colorValue } as CSSProperties}
      onKeyDown={handleContainerKeydown}
    >
      <section className="category-content">
        <CategorySelectIcon className="category-icon icon" aria-hidden="true" />
        <label htmlFor="add-category-label" className="visually-hidden">
          Category
        </label>
        <input
          ref={inputRef}
          id="add-category-label"
          className={clsx("category-input compact", isDuplicate && "is-error")}
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="Enter a category title..."
          defaultValue={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <div className="category-hint hint" hidden={!isDuplicate}>
          This category already exists
        </div>
        <div className="dot"></div>
      </section>
      <section className="category-editor">
        <ColorPicker
          onChange={(color) => setColorValue(color)}
          defaultColor={colorValue}
        />
        <footer className="category-editor-actions cluster">
          <button
            type="button"
            className="cancel-button text small"
            onClick={() => onComplete()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="primary small"
            onClick={handleSave}
            disabled={!inputValue}
          >
            Add category
          </button>
        </footer>
      </section>
    </div>
  );
}
