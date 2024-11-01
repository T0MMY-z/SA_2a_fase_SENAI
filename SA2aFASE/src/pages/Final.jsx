import Navbar from "../components/Navbar";
import './Final.css';

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
            <p><strong>Nome</strong> Usuário</p>
            <p><strong>Email</strong> usuario@example.com</p>
            <p><strong>Senha</strong>123</p>
          </div>
        </div>
        <div className="profile-edit">
          <h2>ALTERAR DADOS DA CONTA</h2>
          <div className="edit-field">
            <label>Nome</label>
            <input type="text" placeholder="Nome" disabled />
            <button className="edit-button">Editar</button>
          </div>
          <div className="edit-field">
            <label>Email</label>
            <input type="email" placeholder="Email" disabled />
            <button className="edit-button">Editar</button>
          </div>
          <div className="edit-field">
            <label>Senha</label>
            <input type="password" placeholder="Senha" disabled />
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
