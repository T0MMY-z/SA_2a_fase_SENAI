import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../contexts/GlobalContext";
import "./Relatorio.css";

function Relatorio() {
  const { calendarData } = useContext(GlobalContext);
  const [weekNumber, setWeekNumber] = useState(1);

  // Obtém os dados da semana atual
  const getCurrentWeekData = () => calendarData[`semana${weekNumber}`] || {};

  // Verifica se a semana está completa
  const isWeekComplete = () => {
    const weekData = getCurrentWeekData();
    const daysOfWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    // Verifica se todos os dias têm dados preenchidos
    return daysOfWeek.every((day) => weekData[day]);
  };

  // Gera o relatório da semana
  const generateReport = () => {
    const weekData = getCurrentWeekData();
    const days = Object.values(weekData);

    const totalSleepHours = days.reduce((sum, day) => sum + (parseFloat(day.sleepHours) || 0), 0);
    const averageSleep = (totalSleepHours / 7).toFixed(1);

    const totalDreams = days.filter((day) => day.dreamed).length;
    const totalWakeups = days.filter((day) => day.wokeUp).length;
    const totalCoffeeCups = days.reduce((sum, day) => sum + (day.coffeeCups || 0), 0);
    const quality = days.filter((day) => day.thumbsup).length > days.filter((day) => day.thumbsdown).length ? "boa" : "ruim";

    return (
      `Na semana ${weekNumber}, você dormiu em média ${averageSleep} horas por noite, ` +
      `sonhou ${totalDreams} vezes, acordou durante a noite ${totalWakeups} vezes, ` +
      `e a qualidade do sono foi predominantemente considerada como ${quality}. ` +
      `Durante a semana, você consumiu um total de ${totalCoffeeCups} xícaras de café.`
    );
  };

  return (
    <div className="relatorio-container">
      <Navbar />
      <div className="card-geral">
        <div className="card-stats">
          <div className="card-semana-relatorio">
            <button
              className="voltaSemana-relatorio"
              onClick={() => setWeekNumber(Math.max(1, weekNumber - 1))}
            >
              &lt;
            </button>
            <h2 className="semanaTitulo-relatorio">Semana {weekNumber}</h2>
            <button className="ProximaSemana-relatorio" onClick={() => setWeekNumber(weekNumber + 1)}>
              &gt;
            </button>
          </div>

          {/* Verifica se a semana está completa */}
          {!isWeekComplete() ? (
            <p className="mensagem-incompleta">
              
            </p>
          ) : (
            <p className="relatorio-texto">
              {generateReport()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
