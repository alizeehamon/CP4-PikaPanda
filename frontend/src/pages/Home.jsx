import "../styles/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PandaCard from "@components/PandaCard";
import ScrollToTop from "@components/ScrollToTop";
import { Link } from "react-router-dom";
import Intro from "@components/Intro";

export default function Home() {
  /* Ajouter ici les méthodes nécéssaires pour récupérer de la donnée du backend et la stocker dans le front */
  const [pandas, setPandas] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pandas`)
      .then((res) => setPandas(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Intro />
      <div id="panda-list">
        <h1 className="panda-title">Mes pandas roux</h1>
        <div className="filter">
          <select
            className="panda_input select"
            name="category"
            id="category"
            onChange={(e) => setCategoriesFilter(e.target.value)}
          >
            <option value="">Choisir le sexe du panda</option>
            <option value="M">Mâle</option>
            <option value="F">Femelle</option>
          </select>
        </div>

        <div className="panda-list">
          {pandas &&
            pandas
              .filter(
                (panda) =>
                  panda.gender === categoriesFilter || !categoriesFilter
              )
              .map((panda) => (
                <li key={panda.id}>
                  <Link to={`/pandas/${panda.id}`}>
                    <PandaCard panda={panda} />
                  </Link>
                </li>
              ))}
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
