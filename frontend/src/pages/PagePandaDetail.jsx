import PandaDetail from "@components/PandaDetail";
import "../styles/PagePandaDetail.css";

function PagePandaDetail() {
  return (
    <div className="card-panda">
      <div className="section-panda-details">
        <h1>En savoir plus sur ce panda</h1>
        <PandaDetail />
      </div>
      <div className="section-potential-match">
        <h1>Mes matchs potentiels</h1>
      </div>
    </div>
  );
}

export default PagePandaDetail;
