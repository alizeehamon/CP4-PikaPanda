import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import AddPanda from "@pages/AddPanda";
import PagePandaDetail from "@pages/PagePandaDetail";
import Navigation from "@components/Navigation";
import Login from "@pages/Login";
import ModifyPanda from "@pages/ModifyPanda";
import useToken from "@components/useToken";
import "./App.css";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="App">
      <Router>
        <>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/pandas/add" element={<AddPanda />} />
            <Route path="/pandas/modify/:id" element={<ModifyPanda />} />
            <Route path="/pandas/:id" element={<PagePandaDetail />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
