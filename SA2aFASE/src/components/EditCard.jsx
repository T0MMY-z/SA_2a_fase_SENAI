import React, { useState, useEffect } from "react";
import "./EditCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMugHot,
  faClock,
  faEye,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

function EditCard({ day, onClose, initialData }) {
  const [coffeeCups, setCoffeeCups] = useState(initialData?.coffeeCups || 0);
  const [sleepTime, setSleepTime] = useState({ sleep: initialData?.sleepTime.split(" - ")[0] || "", wake: initialData?.sleepTime.split(" - ")[1] || "" });
  const [wokeUp, setWokeUp] = useState(initialData?.wokeUp || false);
  const [dreamed, setDreamed] = useState(initialData?.dreamed || false);
  const [thumbsup, setThumbsup] = useState(initialData?.thumbsup || false);
  const [thumbsdown, setThumbsdown] = useState(initialData?.thumbsdown || false);

 
  const handleSave = () => {
    const data = {
      sleepTime: `${sleepTime.sleep} - ${sleepTime.wake}`,
      wokeUp,
      dreamed,
      coffeeCups,
      thumbsup,
      thumbsdown,
    };
    onClose(data);
  };


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
