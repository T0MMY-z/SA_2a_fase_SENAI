import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import "./Home.css";

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
          Transforme suas noites em momentos de descanso profundo.
          </p>
          <p className="p2">Registre e acompanhe cada detalhe do seu sono para dias mais produtivos e energizados.</p>
          <div className="div-4">
            <button className="btn-2">Comece aqui</button>
          </div>
        </div>

        <div className="div-3">
          <img src="public/images/landing.png" alt="foguete"/>
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
