import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");

  const daysOfWeek = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  // Função para carregar os dados do Local Storage ao montar o componente
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("calendarioData")) || {};
    setCalendarData(storedData);
  }, []);

  // Função para salvar os dados no Local Storage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("calendarioData", JSON.stringify(data));
  };

  // Função para avançar à próxima semana
  const avancarSemana = async () => {
    if (!isWeekComplete()) {
      setErrorMessage(`Finalize todos os dias da semana ${weekNumber} antes de avançar!`);
      return;
    }

    setErrorMessage("");

    const nextWeek = weekNumber + 1;

    setWeekNumber(nextWeek);

    // Atualiza os dados localmente e salva no Local Storage
    setCalendarData((prevData) => {
      const updatedData = {
        ...prevData,
        [`semana${nextWeek}`]: prevData[`semana${nextWeek}`] || {},
      };
      saveToLocalStorage(updatedData);
      return updatedData;
    });
  };

  // Função para voltar à semana anterior
  const voltarSemana = () => {
    setErrorMessage("");
    setWeekNumber(weekNumber > 1 ? weekNumber - 1 : 1);
  };

  // Abre o EditCard
  const openEditCard = (day) => {
    setSelectedDay(day);
    setIsEditing(true);
  };

  // Fecha o EditCard e atualiza os dados
  const closeEditCard = (data) => {
    setIsEditing(false);

    if (data) {
      setCalendarData((prevData) => {
        const updatedData = {
          ...prevData,
          [`semana${weekNumber}`]: {
            ...prevData[`semana${weekNumber}`],
            [selectedDay]: data,
          },
        };
        saveToLocalStorage(updatedData); // Salva os dados no Local Storage
        return updatedData;
      });
    }
  };

  const getCurrentWeekData = () => calendarData[`semana${weekNumber}`] || {};

  // Verifica se todos os dias da semana foram preenchidos
  const isWeekComplete = () => {
    const weekData = getCurrentWeekData();
    return daysOfWeek.every((day) => weekData[day]);
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="week">
          {daysOfWeek.map((day, index) => {
            const dayData = getCurrentWeekData()[day];

            return (
              <div key={index} className="day">
                <h3>{day}</h3>
            
                {dayData && (
                  <div className="card-info">
                    {dayData.sleep_time && dayData.wake_time && (
                      <div className="info-row">
                        <span title="Horário que deitou" className="info-text-horario">
                          {dayData.sleep_time}
                        </span>
                        <span title="Horário que acordou" className="info-text-horario">
                          {dayData.wake_time}
                        </span>
                      </div>
                    )}
            
                    {dayData.woke_up && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Você acordou durante a noite"
                          icon={faEye}
                          style={{ color: "#0332be", fontSize: "30px" }}
                        />
                      </div>
                    )}
            
                    {dayData.dreamed && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Você sonhou"
                          icon={faCloud}
                          style={{ color: "#0332be", fontSize: "30px" }}
                        />
                      </div>
                    )}
            
                    {dayData.coffee_cups > 0 && (
                      <div className="info-row-cafe">
                        <span className="info-text-cafe">{dayData.coffee_cups}</span>
                        <FontAwesomeIcon
                          title="Quantidade de café"
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
                          style={{ color: "#008509", fontSize: "40px" }}
                        />
                      </div>
                    )}
            
                    {dayData.thumbsdown && (
                      <div className="info-row">
                        <FontAwesomeIcon
                          title="Avaliação Negativa"
                          icon={faThumbsDown}
                          style={{ color: "#a80000", fontSize: "40px" }}
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

        {isEditing && (
          <EditCard
            day={selectedDay}
            week={weekNumber}
            onClose={closeEditCard}
            initialData={getCurrentWeekData()[selectedDay]}
          />
        )}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
