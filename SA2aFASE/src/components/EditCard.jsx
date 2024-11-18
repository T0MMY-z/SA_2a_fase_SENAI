import React from "react";
import "./EditCard.css";

function EditCard({ day, onClose }) {
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
            <p>thumbsup</p>
            <p>thumbsdown</p>
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
