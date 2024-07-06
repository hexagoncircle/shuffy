import "@css/app-header.css";
import { pluralize } from "@/js/utils";
import Callout from "./Callout";
import SettingsToggle from "./SettingsToggle";

export default function AppHeader() {
  const count = 2;

  return (
    <header className="app-header">
      <section className="app-header-info">
        <h1 className="text-2xl font-semibold">Creative Time</h1>
        <p className="app-header-card-count">{count} {pluralize("card", "cards", count)}</p>
      </section>
      <Callout>
        <p>Lots of cards to add? Consider setting up deck categories first.</p>
      </Callout>
      <SettingsToggle hasNotification />
    </header>
  )
}