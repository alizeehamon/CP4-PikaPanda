/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import AddPanda from "@pages/AddPanda";
import PagePandaDetail from "@pages/PagePandaDetail";
import Navigation from "@components/Navigation";
import Login from "@pages/Login";
import ModifyPanda from "@pages/ModifyPanda";
import LoginContext from "./contexts/LoginContext";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(true);
  return (
    <div className="App">
      <LoginContext.Provider value={{ isConnected, setIsConnected }}>
        <Router>
          {isConnected ? (
            <>
              <Navigation />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/pandas/add" element={<AddPanda />} />
                <Route path="/pandas/modify/:id" element={<ModifyPanda />} />
                <Route path="/pandas/:id" element={<PagePandaDetail />} />
              </Routes>
            </>
          ) : (
            <Login />
          )}
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
