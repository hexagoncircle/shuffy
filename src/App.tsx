import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import DeckEditForm from "@components/DeckEditForm";
import DesignReview from "./DesignReview";
import { CategoriesContext } from "./contexts/CategoriesContext";
import CATEGORIES from "@data/categories.json";
import "@css/reset.css";
import "@css/fonts.css";
import "@css/utils.css";
import "@css/ds.css";

function App() {
  return (
    <>
      <h1 className="visually-hidden">Shuffy</h1>
      <nav id="main-nav" className="cluster">
        <Link to="/">Home</Link>
        <Link to='/edit'>Edit</Link>
        <Link to="/design-review">Design Review</Link>
      </nav>

      <CategoriesContext.Provider value={CATEGORIES}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            handle={{
              bodyClass: ({ bodyClass }: { bodyClass: string }) => bodyClass,
            }}
          />
          <Route path="/edit" element={<DeckEditForm />} />
          <Route path="/design-review" element={<DesignReview />} />

        </Routes>
      </CategoriesContext.Provider>
    </>
  )
}

export default App;
