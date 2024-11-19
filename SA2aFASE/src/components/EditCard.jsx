import React, { useState } from "react";
import "./EditCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function EditCard({ day, onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="edit-card-overlay">
      <div className="edit-card">
        <h2>{day}</h2>
        <div className="edit-fields">
          <div className="field-row">
            <p>HORARIO QUE SE DEITOU</p>
            <input type="time" />
          </div>
          <div className="field-row">
            <p>HORARIO QUE SE LEVANTOU</p>
            <input type="time" />
          </div>
          <div className="field-row">
            <p>ACORDOU DURANTE A NOITE?</p>
            <input type="checkbox" />
          </div>
          <div className="field-row">
            <p>SONHOU DURANTE A NOITE?</p>
            <input type="checkbox" />
          </div>
          <div className="field-row">
            <p>CONSUMIU CAFEÍNA NO DIA?</p>
            <input type="checkbox" />
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
          <button className="btn-save" onClick={onClose}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
