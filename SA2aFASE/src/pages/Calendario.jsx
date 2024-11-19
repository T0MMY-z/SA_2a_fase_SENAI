import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import EditCard from "../components/EditCard";
import './Calendario.css';

function WeeklyCalendar() {
  const [weekNumber, setWeekNumber] = useState(1);
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedDay, setSelectedDay] = useState("");

  const daysOfWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

  const avancarSemana = () => setWeekNumber(weekNumber + 1);
  const voltarSemana = () => setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1);

  const openEditCard = (day) => {
    setSelectedDay(day); 
    setIsEditing(true); 
  };

  const closeEditCard = () => {
    setIsEditing(false); 
  };

  return (
    <div className='container-calendario'>
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
              <button onClick={() => openEditCard(day)}>Editar</button>
            </div>
          ))}
        </div>
      </div>

      {}
      {isEditing && <EditCard day={selectedDay} onClose={closeEditCard} />}
    </div>
  );
}

export default WeeklyCalendar;
