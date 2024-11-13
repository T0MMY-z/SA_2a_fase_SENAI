import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import './Calendario.css'

function WeeklyCalendar() {
  const [weekNumber, setWeekNumber] = useState(1)
  const daysOfWeek = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]


  const avancarSemana = () => setWeekNumber(weekNumber + 1)
  const voltarSemana = () => setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1)

  return (
    <div>
      <Navbar />
      <div className="weekly-calendar-container">
        <div className="header">
          <button className='voltaSemana' onClick={voltarSemana}>&lt;</button>
          <h2 className='semanaTitulo'>Semana {weekNumber}</h2>
          <button className='ProximaSemana' onClick={avancarSemana}>&gt;</button>
        </div>
        <div className="week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day">
              <h3>{day}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyCalendar;
