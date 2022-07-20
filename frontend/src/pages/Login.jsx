import { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import LoginContext from "../contexts/LoginContext";
import "../styles/Login.css";
import imageconnexionlogo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsConnected } = useContext(LoginContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
          email,
          password,
        })
        .then(() => {
          setIsConnected(true);
        })
        .catch(() => {
          Swal.fire({
            title: "Oups!",
            text: "Tes identifiants sont invalides",
            imageUrl: "https://zupimages.net/up/22/29/7vzy.png",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Sad panda",
            confirmButtonColor: "#fbc64e",
          });
        });
    } else {
      Swal.fire({
        title: "Oups!",
        text: "Une erreur est survenue",
        imageUrl: "https://zupimages.net/up/22/29/7vzy.png",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Sad panda",
        confirmButtonColor: "#fbc64e",
      });
    }
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
