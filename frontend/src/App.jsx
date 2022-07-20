import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import AddPanda from "@pages/AddPanda";
import CardPanda from "@pages/PandaDetail";

import "./App.css";
import Navigation from "@components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pandas/add" element={<AddPanda />} />
          <Route path="/pandas/:id" element={<CardPanda />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
