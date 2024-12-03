import Navbar from "../components/Navbar";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      
      // Armazenando o usuário no localStorage após login bem-sucedido
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);
      console.log("Usuário logado:", response.data.user);
      
      // Redireciona para a página de perfil
      navigate("/perfil");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Nome ou senha incorretos!");
      } else {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao realizar login. Tente novamente.");
      }
    }
  };

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
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" placeholder="Digite seu nome" required />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="Digite sua senha" required />
            </div>
            <button type="submit" className="register-button">Login</button>
          </form>
          <p className="login-label">
            Ainda não possui conta? <Link to="/registro">Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
