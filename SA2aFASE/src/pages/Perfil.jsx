import Navbar from "../components/Navbar";
import './Perfil.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  
  // Estado do usuário e sessionId
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId')); // Recupera o sessionId do localStorage
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem('sessionId');  // Remove o sessionId do localStorage
    setSessionId(null);
    setUser(null);
    navigate("/login");
  };

  // Função para redirecionar para o relatório semanal
  const handleGoToRelatorio = () => {
    navigate("/relatorio");
  };

  useEffect(() => {
    // Verifica se há um sessionId no localStorage
    if (sessionId) {
      // Caso exista, busca os dados do perfil
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/perfil?sessionId=${sessionId}`);
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
          navigate("/login");
        }
      };
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [sessionId, navigate]);  // Executa o efeito sempre que o sessionId mudar

  const handleSaveChanges = async () => {
    const updatedUser = {
      username: newUsername || user.username,
      email: newEmail || user.email,
      password: newPassword || user.password,
    };

    try {
      const response = await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
      const updatedData = response.data;

      // Atualiza o estado com os novos dados
      setUser(updatedData);

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src="public/images/perfil.png" alt="Profile" />
          </div>
          <div className="profile-info">
            {user ? (
              <>
                <p>Olá, {user.username}</p>
                <button className="relatorio-button2" onClick={handleLogout}>Deslogar</button>
                <button className="relatorio-button2" onClick={handleGoToRelatorio}>
                  Relatório Semanal
                </button><br/>
                <button className="excluir-button">Excluir Conta</button>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        </div>

        <div className="profile-edit">
          <h2>ALTERAR DADOS DA CONTA</h2>
          
          {/* Nome de usuário */}
          <div className="edit-field">
          <label>Nome</label>
            <input
              type="text"
              value={newUsername || user?.username || ""}
              disabled={!isEditingName}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button className="edit-button" onClick={() => setIsEditingName(!isEditingName)}>
              {isEditingName ? "Salvar" : "Editar"}
            </button>
          </div>

          {/* Email */}
          <div className="edit-field">
          <label>Email</label>
            <input
              type="email"
              value={newEmail || user?.email || ""}
              disabled={!isEditingEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="edit-button" onClick={() => setIsEditingEmail(!isEditingEmail)}>
              {isEditingEmail ? "Salvar" : "Editar"}
            </button>
          </div>

          {/* Senha */}
          <div className="edit-field">
          <label>Senha</label>
            <input
              type={isEditingPassword ? "text" : "password"}
              value={newPassword || user?.password || ""}
              disabled={!isEditingPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="edit-button" onClick={() => setIsEditingPassword(!isEditingPassword)}>
              {isEditingPassword ? "Salvar" : "Editar"}
            </button>
          </div>

          {/* Botão para salvar alterações */}
          <button className="edit-button" onClick={handleSaveChanges}>Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
