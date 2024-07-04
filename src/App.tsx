import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import DeckEditForm from "@components/DeckEditForm";
import DesignReview from "./DesignReview";
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<DeckEditForm />} />
        <Route path="/design-review" element={<DesignReview />} />
      </Routes>
    </>
  )
}

export default App;
