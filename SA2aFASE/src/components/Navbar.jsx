import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">DreamZ</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/calendario">Calendario</Link>
        <Link to="/perfil">Perfil</Link>
      </div>
    </nav>
  );
}

export default Navbar;
