import "@css/ds.css";
import { Link, Route, Routes } from "react-router-dom";
import { CategoriesContext } from "./contexts/CategoriesContext";
import CATEGORIES from "@data/categories.json";
import Home from "./Home";
import Deck from "./Deck";
import DesignReview from "./DesignReview";

function App() {
  return (
    <>
      <h1 className="visually-hidden">Shuffy</h1>
      <CategoriesContext.Provider value={CATEGORIES}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            handle={{
              bodyClass: ({ bodyClass }: { bodyClass: string }) => bodyClass,
            }}
          />
          <Route path="/deck" element={<Deck />} />
          <Route path="/design-review" element={<DesignReview />} />

        </Routes>
      </CategoriesContext.Provider>

      <nav id="main-nav" className="cluster">
        <Link to="/">Home</Link>
        <Link to='/deck'>Deck</Link>
        <Link to="/design-review">Design Review</Link>
      </nav>
    </>
  )
}

export default App;
