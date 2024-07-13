import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import DeckDisplay from "@components/DeckDisplay";
import "@css/deck.css"

export default function Deck() {
  const [name, setName] = useState("Creative Time");

  useEffect(() => {
    if (!name) setName("¯\\_(ツ)_/¯")
  }, [name])

  return (
    <>
      <AppHeader deckName={name} onNameUpdate={setName} />
      <main className="deck flow">
        <DeckDisplay />
      </main>
    </>
  )
}