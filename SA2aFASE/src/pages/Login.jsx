import Navbar from "../components/Navbar";
import "./Login.css"; 

function Contato() {
  return (
    <div className="contato-container">
      <Navbar />
      <div className="card">
        <div className="card-topo">
          <img src="public/images/logo_registro.png" alt="DreamZ Logo" className="logo" />
          <h2 className="slogan">Onde sua noite de sono é importante para nós</h2>
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
        </div>
      </div>
    </div>
  );
}

export default Contato;
