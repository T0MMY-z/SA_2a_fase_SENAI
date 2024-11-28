import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import EditCard from "../components/EditCard";
import './Calendario.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faMugHot, faClock, faEye, faCloud } from "@fortawesome/free-solid-svg-icons";

function WeeklyCalendar() {
  const [weekNumber, setWeekNumber] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [calendarData, setCalendarData] = useState({}); // Para armazenar os dados dos dias

  const daysOfWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

  const avancarSemana = () => setWeekNumber(weekNumber + 1);
  const voltarSemana = () => setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1);

  const openEditCard = (day) => {
    setSelectedDay(day);
    setIsEditing(true);
  };

  const closeEditCard = (data) => {
    setIsEditing(false);
    if (data) {
      setCalendarData({ ...calendarData, [selectedDay]: data }); // Armazenar os dados no estado
    }
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
              {calendarData[day] && (
                <div className="card-info">
                  <div className="info-row">
                    <span title='Horário de sono' className="info-text-horario">{calendarData[day].sleepTime}</span>
                     
                  </div>
                  {calendarData[day].wokeUp && (
                    <div className="info-row">
                      <FontAwesomeIcon title='Você acordou durante a noite?' icon={faEye} style={{ color: "#0332be", fontSize: "30px" }} />
                    </div>
                  )}
                  {calendarData[day].dreamed && (
                    <div className="info-row">
                      <FontAwesomeIcon title='Você sonhou?' icon={faCloud} style={{ color: "#0332be", fontSize: "30px" }} />
                    </div>
                  )}
                  {calendarData[day].coffeeCups > 0 && (
                    <div className="info-row">
                      <span className="info-text">{calendarData[day].coffeeCups}</span>
                      <FontAwesomeIcon title='Quantidade de café' className='icon-cafe' icon={faMugHot} style={{ color: "#0332be", fontSize: "30px" }} />
                    </div>
                  )}
                  {calendarData[day].thumbsup && (
                    <div className="info-row">
                      <FontAwesomeIcon title='Avaliação Positiva' icon={faThumbsUp} style={{ color: "#008509", cursor: "pointer", fontSize: "40px" }} />
                    </div>
                  )}
                  {calendarData[day].thumbsdown && (
                    <div className="info-row">
                      <FontAwesomeIcon title='Avaliação Negativa' icon={faThumbsDown} style={{ color: "#a80000", cursor: "pointer", fontSize: "40px" }} />
                    </div>
                  )}
                  
                </div>
              )}
              <button onClick={() => openEditCard(day)}>Editar</button>
            </div>
          ))}
        </div>
      </div>

      {isEditing && <EditCard day={selectedDay} onClose={closeEditCard} />}
    </div>
  );
}

export default WeeklyCalendar;
