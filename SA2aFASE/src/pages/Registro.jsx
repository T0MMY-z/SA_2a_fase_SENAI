import Navbar from "../components/Navbar";
import "./Registro.css"; 
import { Link, useNavigate } from "react-router-dom"; // Incluindo useNavigate para redirecionar
import axios from "axios"; // Importando o Axios
import { useState } from "react"; // Importando useState para gerenciar os estados

function Registro() {
  // Definindo estados para os campos de formulário
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para navegação programática

  // Função de submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos não estão vazios
    if (!username || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia os dados para o backend
      const response = await axios.post("http://localhost:3000/users", {
        username,
        email,
        password,
      });

      // Exibe mensagem de sucesso
      alert("Usuário registrado com sucesso!");
      console.log("Resposta do servidor:", response.data); // Verificando a resposta do servidor

      // Redireciona para a página de login após o sucesso
      navigate("/login");

    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar. Verifique os dados e tente novamente.");
    }
  };

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
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Atualiza o valor do username
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o valor do email
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Atualiza o valor da senha
                required
              />
            </div>
            <button type="submit" className="register-button">REGISTRAR</button>
          </form>
          <p className="login-label">
            Já possui conta? <Link to="/login">Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
