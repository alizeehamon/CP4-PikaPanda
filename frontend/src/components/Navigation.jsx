import "../styles/Navigation.css";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Navigation() {
  return (
    <div className="nav">
      {" "}
      <nav>
        <ul>
          <li>
            <Link to="/">Mon pandashboard</Link>
          </li>
          <li>
            <Link to="/pandas/add">Ajouter un panda roux</Link>
          </li>
          <li>
            <button
              type="button"
              className="button-nav"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <RiLogoutCircleRLine className="svg-icons" />
            </button>
          </li>
        </ul>
      </nav>
      <Link className="nav-logo" to="/">
        <img src={logo} alt="PikaPanda" />
        <h1 className="nav-title">PikaPanda</h1>
      </Link>
    </div>
  );
}

export default Navigation;
