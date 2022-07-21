import "../styles/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PandaCard from "@components/PandaCard";
import ScrollToTop from "@components/ScrollToTop";
import { Link } from "react-router-dom";
import Intro from "@components/Intro";

export default function Home() {
  const [pandas, setPandas] = useState([]);
  const [name, setName] = useState("");
  const [foundPandas, setFoundPandas] = useState(pandas);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pandas`)
      .then((res) => {
        setPandas(res.data);
        setFoundPandas(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = pandas.filter((panda) => {
        return panda.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundPandas(results);
    } else {
      setFoundPandas(pandas);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  return (
    <>
      <Intro />
      <div id="panda-list">
        <h1 className="panda-title">Mes pandas roux</h1>
        <div className="filter">
          <input
            type="search"
            value={name}
            onChange={filter}
            className="input"
            placeholder="Cherche le nom du panda"
          />
        </div>

        <div className="panda-list">
          {foundPandas && foundPandas.length > 0 ? (
            foundPandas.map((panda) => (
              <li key={panda.id}>
                <Link to={`/pandas/${panda.id}`}>
                  <PandaCard panda={panda} />
                </Link>
              </li>
            ))
          ) : (
            <h1>No results found</h1>
          )}
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
