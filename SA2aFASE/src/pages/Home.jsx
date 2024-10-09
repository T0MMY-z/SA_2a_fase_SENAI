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
            Sua noite de sono decente, deixa a gente contente
          </p>
          <p></p>
          <div className="div-4">
            <button className="btn-2">Comece aqui</button>
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
