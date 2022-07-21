/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/AddPanda.css";

// Partie BONUS #1
export default function AddPanda() {
  const [zoos, setZoos] = useState([]);
  const [zoo, setZoo] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [males, setMales] = useState([]);
  const [father, setFather] = useState("");
  const [females, setFemales] = useState([]);
  const [mother, setMother] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/zoos`)
      .then((res) => res.json())
      .then((data) => setZoos(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas?gender=F`)
      .then((res) => res.json())
      .then((data) => setFemales(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas?gender=M`)
      .then((res) => res.json())
      .then((data) => setMales(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const panda = {
      name,
      zoo,
      gender,
      birthdate,
      father,
      mother,
      description,
      image,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(panda),
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/pandas`, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Oups!",
          text: "Ton panda est encore dans la nature.",
          imageUrl: "https://zupimages.net/up/22/29/7vzy.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Sad panda",
          confirmButtonColor: "#fbc64e",
        });
      })
      .then(
        Swal.fire({
          title: "Félicitations!",
          text: "Ton panda a bien été enregistré.",
          imageUrl: "https://zupimages.net/up/22/29/4cb7.png",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Happy pandas",
          confirmButtonColor: "#fbc64e",
        }),
        setName(""),
        setZoo(""),
        setGender(""),
        setBirthdate(""),
        setFather(""),
        setMother(""),
        setDescription(""),
        setImage("")
      );
  };

  return (
    <div id="pandaadd">
      <h1 className="pandaadd_title">Ajouter un panda roux</h1>

      <form className="pandaadd_form" onSubmit={handleSubmit}>
        <label className="pandaadd_label" htmlFor="name" required>
          Nom du panda (Obligatoire)
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
          Sexe du panda (Obligatoire)
          <select
            className="pandaadd_input"
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Choisir le sexe... </option>
            <option value="M">M </option>
            <option value="F">F </option>
          </select>
        </label>

        <label className="pandaadd_label" htmlFor="zoo" required>
          Nom du zoo où le panda se trouve (Obligatoire)
          <select
            className="pandaadd_input"
            name="zoo"
            id="zoo"
            value={zoo}
            onChange={(e) => setZoo(e.target.value)}
          >
            <option value="">Choisir un zoo... </option>
            {zoos.map((zoo) => (
              <option key={zoo.id} value={zoo.id}>
                {zoo.name}
              </option>
            ))}
          </select>
        </label>

        <label className="pandaadd_label" htmlFor="birthdate">
          Date de naissance
          <input
            className="pandaadd_input"
            id="birthdate"
            name="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>

        <label className="pandaadd_label" htmlFor="father">
          Nom du père
          <select
            className="pandaadd_input"
            name="father"
            id="father"
            value={father}
            onChange={(e) => setFather(e.target.value)}
          >
            <option value="">Choisir un panda roux mâle... </option>
            {males.map((male) => (
              <option key={male.id} value={male.id}>
                {male.name}
              </option>
            ))}
          </select>
        </label>

        <label className="pandaadd_label" htmlFor="mother">
          Nom de la mère
          <select
            className="pandaadd_input"
            name="mother"
            id="mother"
            value={mother}
            onChange={(e) => setMother(e.target.value)}
          >
            <option value="">Choisir un panda roux femelle... </option>
            {females.map((female) => (
              <option key={female.id} value={female.id}>
                {female.name}
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

        <button className="button" type="submit">
          Ajouter au pandashboard
        </button>
      </form>
    </div>
  );
}
