import AppHeader from "./components/AppHeader";
import CardStarter from "./components/CardStarter";

export default function Deck() {
  return (
    <>
      <AppHeader />
      <main className="page center">
        <CardStarter className="center" />
      </main>
    </>
  )
}