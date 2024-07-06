import SettingsIcon from "@assets/settings.svg?react";
import "@css/settings-toggle.css";

interface SettingsToggleProps {
  hasNotification?: boolean;
}

export default function SettingsToggle({ hasNotification }: SettingsToggleProps) {
  return (
    <button className="settings-toggle stack icon-button large">
      <span className="visually-hidden">Menu</span>
      <SettingsIcon aria-hidden="true" />
      {hasNotification ? <span className="beacon"></span> : null}
    </button>
  )
}