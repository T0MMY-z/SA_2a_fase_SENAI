import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import "./Relatorio.css";

function Relatorio() {
  const [weekNumber, setWeekNumber] = useState(1);


  const avancarSemana = () => setWeekNumber(weekNumber + 1);
  const voltarSemana = () => setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1);

  return (
    <div className='relatorio-container'>
      <Navbar />
      <div className="card-geral">
        <div className="card-stats">
          <div className='card-semana-relatorio'>
            <button className='voltaSemana-relatorio' onClick={voltarSemana}>&lt;</button>
            <h2 className='semanaTitulo-relatorio'>Semana {weekNumber}</h2>
            <button className='ProximaSemana-relatorio' onClick={avancarSemana}>&gt;</button>
          </div>
          
        </div>
        <div className="card-grafico">

        </div>
      </div>
    </div>
  );
}

export default Relatorio;