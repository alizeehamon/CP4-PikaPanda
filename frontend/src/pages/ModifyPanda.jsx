/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/AddPanda.css";

// Partie BONUS #1
export default function ModifyPanda() {
  const [idPanda, setIdPanda] = useState("");
  const [zoos, setZoos] = useState([]);
  const [zoo, setZoo] = useState("");
  const [idZoo, setIdZoo] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [available, setAvailable] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setZoo(data.zoo);
        setIdZoo(data.id_zoo);
        setName(data.name);
        setGender(data.gender);
        setDescription(data.description);
        setImage(data.image);
        setAvailable(data.available);
        setIdPanda(data.id);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/zoos`)
      .then((res) => res.json())
      .then((data) => setZoos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const panda = {
      idPanda,
      name,
      idZoo,
      gender,
      description,
      image,
      available,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(panda),
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas/${id}`, requestOptions)
      .then((res) => res.json())
      .then(
        Swal.fire({
          title: "Félicitations!",
          text: "Ton panda a bien été modifié.",
          imageUrl: "https://zupimages.net/up/22/29/4cb7.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Happy pandas",
          confirmButtonColor: "#fbc64e",
        }),
        setTimeout(() => {
          navigate(`/pandas/${idPanda}`);
        }, 2000)
      );
    // .catch((error) => {
    //   console.error(error);
    //   Swal.fire({
    //     title: "Oups!",
    //     text: "Ton panda n'a pas été modifié.",
    //     imageUrl: "https://zupimages.net/up/22/29/7vzy.png",
    //     imageWidth: 300,
    //     imageHeight: 300,
    //     imageAlt: "Sad panda",
    //     confirmButtonColor: "#fbc64e",
    //   });
    // });
  };

  return (
    <div id="pandaadd">
      <h1 className="pandaadd_title">Modifier un panda roux</h1>

      <form className="pandaadd_form" onSubmit={handleSubmit}>
        <label className="pandaadd_label" htmlFor="name" required>
          Nom du panda
          <input
            className="pandaadd_input"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="pandaadd_label" htmlFor="gender" required>
          Sexe du panda
          <select
            className="pandaadd_input"
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="M">M </option>
            <option value="F">F </option>
          </select>
        </label>

        <label className="pandaadd_label" htmlFor="zoo" required>
          Nom du zoo où le panda se trouve
          <select
            className="pandaadd_input"
            name="zoo"
            id="zoo"
            value={idZoo}
            onChange={(e) => setIdZoo(e.target.value)}
          >
            {zoos.map((zooSelect) => (
              <option key={zooSelect.id} value={zooSelect.id}>
                {zooSelect.name}
              </option>
            ))}
          </select>
        </label>

        <label className="pandaadd_label" htmlFor="description">
          Description du panda roux
          <input
            className="pandaadd_input"
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="pandaadd_label" htmlFor="image">
          Image
          <input
            className="pandaadd_input"
            id="image"
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label className="pandaadd_label" htmlFor="available" required>
          Panda disponible
          <select
            className="pandaadd_input"
            name="available"
            id="available"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
          >
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </select>
        </label>

        <button className="button" type="submit">
          Modifier le panda
        </button>
      </form>
    </div>
  );
}
