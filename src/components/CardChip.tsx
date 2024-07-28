import { forwardRef, useId } from "react";
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

const CardChip = forwardRef<HTMLButtonElement, CardChipProps>(({ id, label, isActive, onClick, onActiveChange }, ref) => {
  return (
    <article id={id} className={clsx("chip box", !isActive && "inactive")}>
      <button className="chip-label break-words" ref={ref} onClick={onClick}>
        {label}
      </button>
      <label className="visually-hidden" htmlFor={`${id}-switch`}>Card is shuffy-able</label>
      <Switch
        id={`${id}-switch`}
        variant="compact"
        checked={isActive}
        onChange={onActiveChange}
      />
    </article>
  );
})

export default CardChip;