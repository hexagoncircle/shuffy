import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import CardStarter from "./components/CardStarter";

export default function Deck() {
  const [name, setName] = useState("Creative Time");

  useEffect(() => {
    if (!name) {
      setName("¯\\_(ツ)_/¯")
    }
  }, [name, setName])

  return (
    <>
      <AppHeader deckName={name} onNameUpdate={setName} />
      <main className="page center">
        <CardStarter className="center" />
      </main>
    </>
  )
}