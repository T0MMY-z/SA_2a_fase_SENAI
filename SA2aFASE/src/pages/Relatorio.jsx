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
          <div className='card-semana'>
            <button className='voltaSemana' onClick={voltarSemana}>&lt;</button>
            <h2 className='semanaTitulo'>Semana {weekNumber}</h2>
            <button className='ProximaSemana' onClick={avancarSemana}>&gt;</button>
          </div>
          <div className='card-azul'>

          </div>
        </div>
        <div className="card-grafico">

        </div>
      </div>
    </div>
  );
}

export default Relatorio;