import "../styles/Intro.css";
import panda from "../assets/panda-intro.png";

function Intro() {
  return (
    <div className="intro">
      <div className="image-intro-container">
        <img src={panda} alt="panda intro" />
      </div>
      <div className="intro-presa">
        <h1 className="intro-title">
          Bienvenue sur Pikapanda, ton dashboard 100% gestion de tes pandas
          roux!
        </h1>
        <h2 className="subtitle-presa">C'est quoi le programme ?</h2>
        <p className="desc-presa">
          Au menu du jour, une liste de tous les pandas roux des zoos de la
          région. Le but? Pouvoir matcher des pandas de tous horizons pour
          pérenniser l'espèce...
        </p>
        <h2 className="subtitle-presa">Mais... Pourquoi ?</h2>
        <p className="desc-presa">
          Tu l'as peut être oublié mais tous les jours, l'Homme détruit des
          hectares de forêts et malheureusement, pour nos amis à quatre pattes,
          ce sont leurs habitats qui disparaissent. Sans maison, le panda ne
          peut se rencontrer dans la nature et donc se reproduire. Dans ce cas,
          l'espèce s'éteint progressivement. Alors, à nous, humains, de leur
          donner une chance de se rencontrer et à faire tous les efforts pour
          que les pandas puissent profiter pleinement de leur espace, en zoo ou
          dans leur milieu naturel...
        </p>
        <h2 className="subtitle-presa">
          Au travail, hop, hop, hop, va matcher tout ca!
        </h2>
      </div>
    </div>
  );
}

export default Intro;
