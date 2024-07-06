import { ChangeEvent } from "react";
import SelectIcon from "@assets/double-caret.svg?react";
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
  selected?: SelectOptionProps
  onChange?(e: ChangeEvent<HTMLSelectElement>): void;
}

export default function Select({ id, options, selected, onChange }: SelectProps) {
  return (
    <div className="select">
      <select id={id} onChange={onChange} defaultValue={selected?.value}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>{label}</option>
        ))}
      </select>
      <SelectIcon />
    </div>
  )
}