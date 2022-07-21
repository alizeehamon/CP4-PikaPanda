/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/Login.css";
import imageconnexionlogo from "../assets/logo.png";

async function loginUser(credentials) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) =>
    data.json().catch(() =>
      Swal.fire({
        title: "Oups!",
        text: "Tes identifiants sont invalides",
        imageUrl: "https://zupimages.net/up/22/29/7vzy.png",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Sad panda",
        confirmButtonColor: "#fbc64e",
      })
    )
  );
}

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-container">
      <div className="div-image-connexion-logo">
        <img className="image-connexion-logo" src={imageconnexionlogo} alt="" />
        <h1 className="site-name">Pikapanda</h1>
      </div>
      <h1 className="title-login">Se connecter</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="inputlogmail"
          type="text"
          name="mail"
          id="mail"
          placeholder="martindupont@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputlogpassword"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="validate-login">
          <button className="button-validate-login" type="submit">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
