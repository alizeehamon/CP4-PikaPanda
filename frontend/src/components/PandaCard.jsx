/* eslint-disable react/prop-types */
import "../styles/PandaCard.css";

export default function PandaCard({ panda }) {
  const { name, image, description, gender, score, id } = panda;

  return (
    <div className="c-card">
      <figure className="c-card__header js-card-header">
        <img src={image} alt="panda" className="c-card__image" />
      </figure>
      <div className="c-card__body">
        <h2 className="c-title c-title--primary">
          {name} - {gender}
        </h2>
        <p className="c-content">{description}</p>
        <p className="score">{score ? `Matching score: ${score}` : null}</p>
      </div>
      <div className="c-card__footer">
        <button type="button" className="c-button">
          <a href={id}>Pick me </a>
        </button>
      </div>
    </div>
  );
}
