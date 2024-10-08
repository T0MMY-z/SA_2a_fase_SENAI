import { Link } from "react-router-dom"
import './Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
      <label>DreamZ</label>
        <Link to="/">Login</Link>
        <Link to="/contato">Registro</Link>
        <Link to="/generica">Calendario</Link>
        <Link to="/final">Meu Perfil</Link>
    </nav>
  )
}

export default Navbar
