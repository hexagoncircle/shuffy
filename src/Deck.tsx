import AppHeader from "./components/AppHeader";
import DeckDisplay from "@components/DeckDisplay";
import ConfirmModal from "@components/ConfirmModal";
import ConfirmModalProvider from "@components/ConfirmModalContext";
import "@css/deck.css"

export default function Deck() {
  return (
    <ConfirmModalProvider>
      <AppHeader />
      <main className="deck flow">
        <DeckDisplay />
        <ConfirmModal />
      </main>
    </ConfirmModalProvider>
  )
}