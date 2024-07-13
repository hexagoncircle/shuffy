import { forwardRef, useId } from "react";
import Switch from "./Switch";
import "@css/chip.css";
import clsx from "clsx";

export interface CardProps {
  label: string;
  isActive: boolean;
  onClick(): void;
  onActiveChange(): void;
}

const Chip = forwardRef<HTMLButtonElement, CardProps>(({ label, isActive, onClick, onActiveChange }, ref) => {
  const id = useId();

  return (
    <article className={clsx("chip box", !isActive && "inactive")}>
      <button className="chip-label" ref={ref} onClick={onClick}>
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

export default Chip;