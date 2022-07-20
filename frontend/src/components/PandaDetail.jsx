import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/PandaDetail.css";

export default function PlantDetail() {
  const { id } = useParams();
  const [panda, setPanda] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas/${id}`)
      .then((response) => response.json())
      .then((data) => setPanda(data));
  }, []);

  return (
    <div id="panda-detail">
      <div className="wrap-image">
        <img src={panda.image} alt={panda.name} />
      </div>
      <div className="description">
        <h3>{panda.name}</h3>
        <div />
        <p>{panda.description}</p>
        <h4>A little more about {panda.name}</h4>
        <ul>
          <li>
            <strong>Date de naissance: </strong>
            {panda.birth_date}
          </li>
          <li>
            <strong>Sexe: </strong>
            {panda.gender}
          </li>
          <li>
            <strong>Mon zoo: </strong>
            {panda.zoo} - {panda.city}
          </li>
          <li>
            <strong>Disponible ? </strong>
            {panda.available}
          </li>
        </ul>
      </div>
    </div>
  );
}
