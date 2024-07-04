import { ChangeEvent } from "react";
import "@css/select.css"

interface SelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

interface SelectProps {
  id: string;
  options: SelectOptionProps[];
  onChange?(e: ChangeEvent<HTMLSelectElement>): void;
  selected?: SelectOptionProps
}

export default function Select({ id, options, selected, onChange }: SelectProps) {
  return (
    <div className="select">
      <select id={id} onChange={onChange} defaultValue={selected?.value}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>{label}</option>
        ))}
      </select>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentcolor" viewBox="0 0 256 256">
        <path d="M184.49,167.51a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L128,207l39.51-39.52A12,12,0,0,1,184.49,167.51Zm-96-79L128,49l39.51,39.52a12,12,0,0,0,17-17l-48-48a12,12,0,0,0-17,0l-48,48a12,12,0,0,0,17,17Z"></path>
      </svg>
    </div>
  )
}