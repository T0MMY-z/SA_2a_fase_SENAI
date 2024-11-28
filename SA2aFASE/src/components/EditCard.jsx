import React, { useState } from "react";
import "./EditCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faMugHot, faClock, faEye, faCloud } from "@fortawesome/free-solid-svg-icons";

function EditCard({ day, onClose }) {
  const [selected, setSelected] = useState(null);
  const [coffeeCups, setCoffeeCups] = useState(0); // Estado para o número de xícaras de café
  const [sleepTime, setSleepTime] = useState({ sleep: '', wake: '' }); // Horário que se deitou e que se levantou
  const [wokeUp, setWokeUp] = useState(false); // Se acordou durante a noite
  const [dreamed, setDreamed] = useState(false); // Se sonhou
  

  // Função para salvar os dados e passar para o calendário
  const handleSave = () => {
    const data = {
      sleepTime: `${sleepTime.sleep} - ${sleepTime.wake}`, // Exemplo de tempo de sono
      wokeUp,
      dreamed,
      coffeeCups,
    };
    onClose(data); // Passa os dados para o calendário
  };

  // Função para validar a quantidade de xícaras de café
  const handleCoffeeChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setCoffeeCups(value);
    }
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
              onChange={(e) => setSleepTime({ ...sleepTime, sleep: e.target.value })}
            />
          </div>
          <div className="field-row">
            <p>Horário que se levantou</p>
            <input 
              type="time" 
              value={sleepTime.wake} 
              onChange={(e) => setSleepTime({ ...sleepTime, wake: e.target.value })}
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
                color: "#008509",
                cursor: "pointer",
                fontSize: "60px",
              }}
              onClick={() => setSelected("up")}
            />
            <FontAwesomeIcon
              icon={faThumbsDown}
              style={{
                color: "#a80000",
                cursor: "pointer",
                fontSize: "60px",
              }}
              onClick={() => setSelected("down")}
            />
          </div>
          <div className="feedback-container">
            {selected === "up" && (
              <p className="feedback-message" style={{ color: "#008509" }}>
                Você escolheu uma avaliação positiva!
              </p>
            )}
            {selected === "down" && (
              <p className="feedback-message" style={{ color: "#a80000" }}>
                Você escolheu uma avaliação negativa!
              </p>
            )}
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
