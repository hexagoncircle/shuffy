import clsx from "clsx";
import { ChangeEvent } from "react";
import OnIcon from "@assets/check.svg?react";
import OffIcon from "@assets/close.svg?react";
import "@css/switch.css"


interface SwitchProps {
  id: string;
  checked?: boolean;
  variant?: "default" | "compact";
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

export default function Switch({ id, checked, onChange, variant }: SwitchProps) {
  const isCompact = variant === "compact";

  return (
    <div className="switch">
      <input id={id} type="checkbox" role="switch" defaultChecked={checked} onChange={onChange} />
      <div className={clsx("switch-on", isCompact && "switch-icon")} aria-hidden="true">
        {isCompact ? <OnIcon /> : "On"}
      </div>
      <div className={clsx("switch-off", isCompact && "switch-icon")} aria-hidden="true">
        {isCompact ? <OffIcon /> : "Off"}
      </div>
    </div>
  )
}