import Navbar from "../components/Navbar";
import './Perfil.css';
import { Link } from "react-router-dom";


function Profile() {
  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src="public/images/perfil.png" alt="Profile" />
          </div>
          <div className="profile-info">
            <p>Olá, usuario</p>
            <button className="relatorio-button2">
                 <Link to="/relatorio" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Relatório Semanal
                  </Link>
                </button><br/>
            <button className="excluir-button">Excluir Conta</button>
          </div>
          
        </div>
        <div className="profile-edit">
          <h2>ALTERAR DADOS DA CONTA</h2>
          <div className="edit-field">
            <label>Nome</label>
            <input type="text" disabled />
            <button className="edit-button">Editar</button>
          </div>
          <div className="edit-field">
            <label>Email</label>
            <input type="email"disabled />
            <button className="edit-button">Editar</button>
          </div>
          <div className="edit-field">
            <label>Senha</label>
            <input type="password"  disabled />
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Profile;
