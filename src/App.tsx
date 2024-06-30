import { useState } from "react";
import DeckEditForm from "./components/DeckEditForm";
import IntroScreen from "./components/IntroScreen";
import "./css/reset.css";
import "./css/utils.css";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("intro");

  return (
    <>
      <h1 className="visually-hidden">Shuffy</h1>

      {/* <section className="cluster">
        <button onClick={() => setDisplay("intro")}>Home</button>
        <button onClick={() => setDisplay("edit")}>Edit deck</button>
        <button onClick={() => setDisplay("shuffle")}>Shuffle</button>
      </section> */}

      {display === "intro" && <IntroScreen />}
      {display === "edit" && <DeckEditForm />}
    </>
  )
}

export default App;
