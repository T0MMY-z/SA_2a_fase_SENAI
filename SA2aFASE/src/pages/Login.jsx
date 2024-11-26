import Navbar from "../components/Navbar";
import "./Login.css"; 
import { Link } from "react-router-dom";

function Contato() {
  return (
    <div className="contato-container">
      <Navbar />
      <div className="card">
        <div className="card-topo">
          <img src="public/images/logo_registro.png" alt="DreamZ Logo" className="logo-login" />
          <label className="titulo-login">DreamZ</label>
          <h2 className="slogan-login">Onde sua noite de sono é importante para nós</h2>
        </div>
        <div className="card-baixo">
          <h2 className="card-title">Acesse sua conta</h2>
          <form className="register-form">
            <div className="form-group">
              <input type="text" id="name" placeholder="Digite seu nome" />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="Digite sua senha" />
            </div>
            <button className="register-button">Login</button>
          </form>
          <p className="login-label">
           Ainda não possui conta? <Link to="/registro">Clique aqui</Link>
           </p>
        </div>
      </div>
    </div>
  );
}

export default Contato;
