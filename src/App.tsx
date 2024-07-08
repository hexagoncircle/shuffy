import "@css/ds.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Deck from "./Deck";
import DesignReview from "./DesignReview";
import CategoriesProvider from "@components/CategoriesContext";
import SettingsProvider from "@components/SettingsContext";
import CardsProvider from "@components/CardsContext";

function App() {
  return (
    <>
      <h1 className="visually-hidden">Shuffy</h1>

      <SettingsProvider>
        <CategoriesProvider>
          <CardsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deck" element={<Deck />} />
              <Route path="/design-review" element={<DesignReview />} />
            </Routes>
          </CardsProvider>
        </CategoriesProvider>
      </SettingsProvider>

      <nav id="main-nav" className="cluster">
        <Link to="/">Home</Link>
        <Link to='/deck'>Deck</Link>
        <Link to="/design-review">Design Review</Link>
      </nav>
    </>
  )
}

export default App;
