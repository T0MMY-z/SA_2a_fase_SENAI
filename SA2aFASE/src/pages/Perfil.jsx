import Navbar from "../components/Navbar";
import './Perfil.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redireciona se não houver usuário
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleSaveChanges = async () => {
    const updatedUser = {
      username: newUsername || user.username,
      email: newEmail || user.email,
      password: newPassword || user.password,
      

    };

    try {
      // Faz a requisição para atualizar o usuário no backend
      const response = await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

      // Atualiza o estado com os dados retornados (não alterando o ID)
      const updatedData = response.data;

      // Atualiza o localStorage com os novos dados do usuário
      localStorage.setItem("user", JSON.stringify(updatedData));

      // Atualiza o estado do usuário
      setUser(updatedData);

      // Atualiza os valores dos campos de edição
      setNewUsername(updatedData.username);
      setNewEmail(updatedData.email);
      setNewPassword("");

      // Desativa os campos de edição
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingPassword(false);

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
                <button className="relatorio-button2">
                  <Link to="/relatorio" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Relatório Semanal
                  </Link>
                </button><br />
                <button className="excluir-button">Excluir Conta</button>
              </>
            ) : (
              <p>Carregando...</p>
            )}
            <button className="logout-button" onClick={handleLogout}>Deslogar</button>
          </div>
        </div>

        <div className="profile-edit">
          <h2>ALTERAR DADOS DA CONTA</h2>
          <div className="edit-field">
            <label>Nome</label>
            <input
              type="text"
              value={newUsername || user?.username || ""}  // Exibe o nome de usuário
              disabled={!isEditingName}
              onChange={(e) => setNewUsername(e.target.value)} // Atualiza o novo nome
            />
            <button className="edit-button" onClick={toggleEditName}>
              {isEditingName ? "Salvar" : "Editar"}
            </button>
          </div>

          <div className="edit-field">
            <label>Email</label>
            <input
              type="email"
              value={newEmail || user?.email || ""} // Exibe o email
              disabled={!isEditingEmail}
              onChange={(e) => setNewEmail(e.target.value)} // Atualiza o novo email
            />
            <button className="edit-button" onClick={toggleEditEmail}>
              {isEditingEmail ? "Salvar" : "Editar"}
            </button>
          </div>

          <div className="edit-field">
            <label>Senha</label>
            <input
              type={isEditingPassword ? "text" : "password"}  // Senha visível se editando
              value={newPassword || user?.password || ""}  // Exibe a senha atual
              disabled={!isEditingPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Atualiza a nova senha
            />
            <button className="edit-button" onClick={toggleEditPassword}>
              {isEditingPassword ? "Salvar" : "Editar"}
            </button>
          </div>

          <button className="save-changes-button" onClick={handleSaveChanges}>Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
