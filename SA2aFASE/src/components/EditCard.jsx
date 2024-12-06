import React, { useState } from "react";
import "./EditCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditCard({ day, onClose, initialData, userId, week, isEditing }) {
  const [coffeeCups, setCoffeeCups] = useState(initialData?.coffee_cups || 0);
  const [sleepTime, setSleepTime] = useState({
    sleep: initialData?.sleep_time || "",
    wake: initialData?.wake_time || "",
  });
  const [wokeUp, setWokeUp] = useState(initialData?.woke_up || false);
  const [dreamed, setDreamed] = useState(initialData?.dreamed || false);
  const [thumbsup, setThumbsup] = useState(initialData?.thumbsup || false);
  const [thumbsdown, setThumbsdown] = useState(initialData?.thumbsdown || false);

  const formatTime = (time) => {
    if (!time) return "00:00";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const handleSave = () => {
    console.log("Horário que deitou:", sleepTime.sleep);
    console.log("Horário que acordou:", sleepTime.wake);
  
    // Calcular a duração do sono
    const calculateHoursSlept = (sleepTime, wakeTime) => {
      const sleepDate = new Date(`1970-01-01T${sleepTime}:00`);
      const wakeDate = new Date(`1970-01-01T${wakeTime}:00`);
      
      let differenceMs = wakeDate - sleepDate;
  
      // Caso a pessoa tenha acordado no dia seguinte
      if (differenceMs < 0) {
        differenceMs += 24 * 60 * 60 * 1000;  // Adiciona um dia em milissegundos
      }
  
      const differenceHours = differenceMs / (1000 * 60 * 60);
      return parseFloat(differenceHours.toFixed(2));  // Arredonda para 2 casas decimais
    };
  
    const hoursSlept = calculateHoursSlept(sleepTime.sleep, sleepTime.wake);
  
    console.log("Horas dormidas:", hoursSlept);
  
    const data = {
      user_id: userId,
      week,
      day_of_week: day,
      sleep_time: formatTime(sleepTime.sleep),
      wake_time: formatTime(sleepTime.wake),
      woke_up: wokeUp,
      dreamed: dreamed,
      coffee_cups: coffeeCups,
      thumbsup,
      thumbsdown,
      hours_slept: hoursSlept,  // Envia a duração calculada ao backend
    };
  
    const url = isEditing
      ? `http://localhost:3000/sleep/${initialData.id}`
      : "http://localhost:3000/sleep";
  
    const method = isEditing ? "put" : "post";
  
    axios({
      method,
      url,
      data,
    })
      .then((response) => {
        const formattedData = {
          ...response.data,
          sleep_time: formatTime(response.data.sleep_time),
          wake_time: formatTime(response.data.wake_time),
        };
  
        console.log("Dados de sono salvos com sucesso:", formattedData);
        onClose(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados de sono:", error);
      });
  };
  

  const handleCoffeeChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= 0) setCoffeeCups(value);
  };

  return (
    <div className="edit-card-overlay">
      <div className="edit-card">
        <h2>{day}</h2>
        <div className="edit-fields">
          <div className="field-row">
            <p>Horário que se deitou</p>
            <input
              type="time"
              value={sleepTime.sleep}
              onChange={(e) =>
                setSleepTime({ ...sleepTime, sleep: e.target.value })
              }
            />
          </div>
          <div className="field-row">
            <p>Horário que se levantou</p>
            <input
              type="time"
              value={sleepTime.wake}
              onChange={(e) =>
                setSleepTime({ ...sleepTime, wake: e.target.value })
              }
            />
          </div>
          <div className="field-row">
            <p>Acordou durante a noite?</p>
            <input
              type="checkbox"
              checked={wokeUp}
              onChange={() => setWokeUp(!wokeUp)}
            />
          </div>
          <div className="field-row">
            <p>Sonhou?</p>
            <input
              type="checkbox"
              checked={dreamed}
              onChange={() => setDreamed(!dreamed)}
            />
          </div>
          <div className="field-row">
            <p>Xícaras de café tomadas</p>
            <input
              className="cafe-input"
              type="number"
              value={coffeeCups}
              min="0"
              onChange={handleCoffeeChange}
            />
          </div>

          <p className="avaliacao">AVALIAÇÃO</p>
          <div className="avaliacao-buttons">
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{
                color: thumbsup ? "#008509" : "#bbb",
                cursor: "pointer",
                fontSize: "60px",
              }}
              onClick={() => {
                setThumbsup(!thumbsup);
                setThumbsdown(false);
              }}
            />
            <FontAwesomeIcon
              icon={faThumbsDown}
              style={{
                color: thumbsdown ? "#a80000" : "#bbb",
                cursor: "pointer",
                fontSize: "60px",
              }}
              onClick={() => {
                setThumbsdown(!thumbsdown);
                setThumbsup(false);
              }}
            />
          </div>
        </div>

        <div className="edit-card-actions">
          <button className="btn-save" onClick={handleSave}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
