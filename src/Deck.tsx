import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import DeckDisplay from "@components/DeckDisplay";
import "@css/deck.css"
import ConfirmModal from "@components/ConfirmModal";
import ConfirmModalProvider from "@components/ConfirmModalContext";

export default function Deck() {
  const [name, setName] = useState("Creative Time");

  useEffect(() => {
    if (!name) setName("¯\\_(ツ)_/¯")
  }, [name])

  return (
    <ConfirmModalProvider>
      <AppHeader deckName={name} onNameUpdate={setName} />
      <main className="deck flow">
        <DeckDisplay />
        <ConfirmModal />
      </main>
    </ConfirmModalProvider>
  )
}