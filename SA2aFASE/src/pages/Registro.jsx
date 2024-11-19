import Navbar from "../components/Navbar";
import "./Registro.css"; 
import { Link } from "react-router-dom";


function Contato() {
  return (
    <div className="contato-container">
      <Navbar />
      <div className="card">
        <div className="card-topo">
          <img src="public/images/logo_registro.png" alt="DreamZ Logo" className="logoteste" />
          <label className="dreamz-titulo">DreamZ</label>
          <h2 className="slogandreamz">Onde sua noite de sono é importante para nós</h2>
        </div>
        <div className="card-baixo">
          <h2 className="card-title">REGISTRE-SE</h2>
          <form className="register-form">
            <div className="form-group">
              <input type="text" id="name" placeholder="Digite seu nome" />
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder="Digite seu e-mail" />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="Digite sua senha" />
            </div>
            <button className="register-button">REGISTRAR</button>
          </form>
          <p className="login-label">
           Já possui conta? <Link to="/login">Clique aqui</Link>
           </p>
        </div>
      </div>
    </div>
  );
}

export default Contato;
