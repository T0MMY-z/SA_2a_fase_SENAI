import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditCard from "../components/EditCard";
import "./Calendario.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faMugHot, faEye, faCloud } from "@fortawesome/free-solid-svg-icons";

function WeeklyCalendar() {
  const [weekNumber, setWeekNumber] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [calendarData, setCalendarData] = useState({}); // Armazena os dados das semanas
  const [errorMessage, setErrorMessage] = useState(""); // Para exibir mensagens de erro

  const daysOfWeek = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  // Função para avançar a semana
  const avancarSemana = () => {
    if (!isWeekComplete()) {
      setErrorMessage(`Finalize todos os dias da semana ${weekNumber} antes de avançar!`);
      return;
    }
    setErrorMessage(""); // Limpa mensagem de erro ao avançar
    setWeekNumber(weekNumber + 1);
  };

  // Função para voltar a semana
  const voltarSemana = () => {
    setErrorMessage(""); // Limpa mensagem de erro
    setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1);
  };

  // Função para abrir o card de edição de um dia específico
  const openEditCard = (day) => {
    setSelectedDay(day);
    setIsEditing(true);
  };

  // Função para fechar o EditCard e salvar as alterações
  const closeEditCard = (data) => {
    setIsEditing(false);
    if (data) {
      setCalendarData((prevData) => ({
        ...prevData,
        [`semana${weekNumber}`]: {
          ...prevData[`semana${weekNumber}`],
          [selectedDay]: data, // Salva os dados no dia específico
        },
      }));
    }
  };

  // Acessa os dados da semana atual
  const getCurrentWeekData = () => calendarData[`semana${weekNumber}`] || {};

  // Verifica se a semana está completa
  const isWeekComplete = () => {
    const weekData = getCurrentWeekData();
    return daysOfWeek.every((day) => weekData[day]); // Verifica se todos os dias têm dados
  };

  return (
    <div className="container-calendario">
      <Navbar />
      <div className="weekly-calendar-container">
        <div className="header">
          <button className="voltaSemana" onClick={voltarSemana}>
            &lt;
          </button>
          <h2 className="semanaTitulo">Semana {weekNumber}</h2>
          <button className="ProximaSemana" onClick={avancarSemana}>
            &gt;
          </button>
        </div>

        {/* Mensagem de erro ao tentar avançar semana incompleta */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="week">
          {daysOfWeek.map((day, index) => {
            const dayData = getCurrentWeekData()[day]; // Acessa os dados do dia
            return (
              <div key={index} className="day">
                <h3>{day}</h3>
                {dayData && (
                  <div className="card-info">
                    <div className="info-row">
                      <span title="Horário de sono" className="info-text-horario">
                        {dayData.sleepTime}
                      </span>
                    </div>
                    {dayData.wokeUp && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Você acordou durante a noite?"
                          icon={faEye}
                          style={{ color: "#0332be", fontSize: "30px" }}
                        />
                      </div>
                    )}
                    {dayData.dreamed && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Você sonhou?"
                          icon={faCloud}
                          style={{ color: "#0332be", fontSize: "30px" }}
                        />
                      </div>
                    )}
                    {dayData.coffeeCups > 0 && (
                      <div className="info-row">
                        <span className="info-text">{dayData.coffeeCups}</span>
                        <FontAwesomeIcon
                          title="Quantidade de café"
                          className="icon-cafe"
                          icon={faMugHot}
                          style={{ color: "#0332be", fontSize: "30px" }}
                        />
                      </div>
                    )}
                    {dayData.thumbsup && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Avaliação Positiva"
                          icon={faThumbsUp}
                          style={{ color: "#008509", cursor: "pointer", fontSize: "40px" }}
                        />
                      </div>
                    )}
                    {dayData.thumbsdown && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Avaliação Negativa"
                          icon={faThumbsDown}
                          style={{ color: "#a80000", cursor: "pointer", fontSize: "40px" }}
                        />
                      </div>
                    )}
                  </div>
                )}
                <button onClick={() => openEditCard(day)}>Editar</button>
              </div>
            );
          })}
        </div>
      </div>

      {isEditing && (
        <EditCard
          day={selectedDay}
          onClose={closeEditCard}
          initialData={getCurrentWeekData()[selectedDay]}
        />
      )}
    </div>
  );
}

export default WeeklyCalendar;
