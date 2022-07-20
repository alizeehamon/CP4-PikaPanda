import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PandaCard from "./PandaCard";

export default function PandaMatch() {
  const { id } = useParams();
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/partners/${id}`)
      .then((res) => res.json())
      .then((data) => setPartners(data));
  }, []);

  return (
    <div className="panda-match-container">
      {partners &&
        partners.map((panda) => (
          <li key={panda.id}>
            <PandaCard panda={panda} />
          </li>
        ))}
    </div>
  );
}
