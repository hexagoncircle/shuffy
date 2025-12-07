import { forwardRef, KeyboardEvent } from "react";
import Switch from "./Switch";
import "@css/chip.css";
import clsx from "clsx";

export interface CardChipProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick(): void;
  onActiveChange(): void;
}

const CardChip = forwardRef<HTMLButtonElement, CardChipProps>(
  ({ id, label, isActive, onClick, onActiveChange }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "a") {
        onActiveChange();
      }
    };

    return (
      <article id={id} className={clsx("chip box", !isActive && "inactive")}>
        <button
          className="chip-label break-words"
          ref={ref}
          onClick={onClick}
          onKeyDown={handleKeyDown}
        >
          {label}
        </button>
        <label className="visually-hidden" htmlFor={`${id}-switch`}>
          Card is {isActive ? "" : "not"} shuffy-able
        </label>
        <span className="focus-label">
          Press <kbd>a</kbd> to toggle active status
        </span>
        <Switch
          id={`${id}-switch`}
          variant="compact"
          checked={isActive}
          onChange={onActiveChange}
          tabIndex={-1}
        />
      </article>
    );
  }
);

export default CardChip;
