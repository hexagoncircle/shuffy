import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import DeckDisplay from "@components/DeckDisplay";
import "@css/deck.css"
import ConfirmModal from "@components/ConfirmModal";
import ConfirmModalProvider from "@components/ConfirmModalContext";

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