import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import "./Home.css"; // Certifique-se de que o caminho para o CSS esteja correto

function Home() {
  const { usuarioLogado } = useContext(GlobalContext);

  return (
    <div className="container">
      <Navbar />
      <div className="div-1">
        
        
      </div>

      <div className="row">
        <div className="div-2">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam eos
            delectus exercitationem facilis quasi cumque molestias reprehenderit
            numquam. Animi accusantium sit quisquam reiciendis nobis nulla
            eveniet adipisci fugit dolor excepturi?
          </p>
          <p>Lorem ipsum dolor sit amet</p>
          <div className="div-4">
            <button>BOTÃO</button>
          </div>
        </div>

        <div className="div-3">
          <img src="public/images/foguete.png" alt="foguete"/>
        </div>
      </div>

      <div className="div-5">
        <label>INSTAGRAM</label>
        <label>FACEBOOK</label>
        <label>EMAIL</label>
      </div>
    </div>
  );
}

export default Home;
