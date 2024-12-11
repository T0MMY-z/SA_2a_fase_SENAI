import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../contexts/GlobalContext";
import "./Relatorio.css";

function Relatorio() {
  const { calendarData } = useContext(GlobalContext);
  const [weekNumber, setWeekNumber] = useState(1);
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [reportText, setReportText] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reports');
      setWeeklyReports(response.data);
    } catch (err) {
      console.error('Erro ao buscar relatórios:', err.message);
    }
  };

  useEffect(() => {
    fetchReports();  
  }, []);

  const getCurrentWeekData = () => {
    return weeklyReports.find(report => report.week === weekNumber) || {};
  };

  const generateReport = async () => {
    const weekData = getCurrentWeekData();

    if (!weekData) return "Nenhum dado disponível para esta semana.";

    const {
      average_hours_slept,
      average_coffee_cups,
      thumbsup_count,
      thumbsdown_count,
      days_filled
    } = weekData;

    if (days_filled < 7) {
      return alert(`A semana ${weekNumber} está incompleta. Faltam alguns dias de dados.`);
    }

    const formattedSleepHours = average_hours_slept.toFixed(2);

    return `Na semana ${weekNumber}, você dormiu em média ${formattedSleepHours} horas, 
            consumiu ${average_coffee_cups} xícaras de café, 
            recebeu ${thumbsup_count} feedbacks positivos e teve ${thumbsdown_count} feedbacks negativos.`;
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/check-complete-week/${weekNumber}`);

      if (response.data && response.data.complete) {
        const reportResponse = await axios.post('http://localhost:3000/generate-weekly-report', { week: weekNumber });
        const reportData = reportResponse.data;

        if (reportData) {
          const newMessages = [];
          
          // Negative feedback
          if (reportData.average_coffee_cups > 20) {
            newMessages.push({
              text: "Nesta semana, o consumo de café ultrapassou 20 xícaras. Considere moderar o consumo para proteger sua saúde.",
              type: "warning"
            });
          }
          if (reportData.thumbsdown_count > reportData.thumbsup_count) {
            newMessages.push({
              text: "As avaliações negativas foram mais frequentes nesta semana. É importante refletir e entender os motivos por trás desse feedback.",
              type: "warning"
            });
          }
          if (reportData.average_hours_slept < 7) {
            newMessages.push({
              text: "Você está dormindo menos de 7 horas por noite, o que pode afetar seu bem-estar físico e mental. Procure melhorar sua rotina de sono.",
              type: "warning"
            });
          }

          // Positive feedback
          if (reportData.average_coffee_cups <= 20) {
            newMessages.push({
              text: "Você manteve um consumo de café moderado esta semana, o que é ótimo para sua saúde!",
              type: "positive"
            });
          }
          if (reportData.thumbsup_count >= reportData.thumbsdown_count) {
            newMessages.push({
              text: "Parabéns! As avaliações positivas foram mais frequentes nesta semana. Continue o bom trabalho!",
              type: "positive"
            });
          }
          if (reportData.average_hours_slept >= 7) {
            newMessages.push({
              text: "Você está dormindo pelo menos 7 horas por noite, o que é excelente para seu bem-estar!",
              type: "positive"
            });
          }

          setMessages(newMessages);

          const sleepQuality = reportData.thumbsup_count > reportData.thumbsdown_count ? "boa" : "ruim";

          setReportText(`
            Na semana ${weekNumber}, você dormiu em média ${reportData.average_hours_slept.toFixed(2)} horas por noite, 
            sonhou ${reportData.dreamed_count} vezes e acordou durante a noite ${reportData.woke_up_count} vezes. 
            A qualidade do seu sono foi predominantemente classificada como ${sleepQuality}. 
            Durante a semana, você consumiu um total de ${reportData.average_coffee_cups} xícaras de café.
          `);
        }
      } else {
        alert('A semana está incompleta. Faltam alguns dias de registros.');
      }
    } catch (error) {
      console.error('Erro ao verificar ou gerar o relatório:', error.message);
      alert('Erro ao verificar ou gerar o relatório.');
    }
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
            <button
              className="ProximaSemana-relatorio"
              onClick={() => setWeekNumber(weekNumber + 1)}
            >
              &gt;
            </button>
          </div>

          <p className="relatorio-texto">
            {reportText}
          </p>

          {/* Botão grande adicionado na parte inferior */}
          <button className="btn-gerar-relatorio" onClick={handleGenerateReport}>
            Gerar Relatório Detalhado
          </button>
        </div>

        {/* Container de avisos posicionado do lado direito */}
        <div className="card-warn">
          {messages.map((message, index) => (
            <p key={index} className={message.type === "warning" ? "warn-text" : "positive-text"}>
              {message.text}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}

/*-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabela de sessões (para gerenciar sessões de login)
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de dados de sono
CREATE TABLE IF NOT EXISTS sleep_data (
    id SERIAL PRIMARY KEY,
    week INTEGER,
    day_of_week VARCHAR(15),
    sleep_time TIME(0),  -- Sem precisão para segundos
    wake_time TIME(0),   -- Sem precisão para segundos
    woke_up BOOLEAN,
    dreamed BOOLEAN,
    coffee_cups INTEGER,
    thumbsup BOOLEAN,
    thumbsdown BOOLEAN,
    hours_slept FLOAT
);

CREATE TABLE IF NOT EXISTS weekly_reports (
    id SERIAL PRIMARY KEY,
    week INTEGER,
    average_hours_slept FLOAT,
    average_coffee_cups FLOAT,
    thumbsup_count INTEGER,
    thumbsdown_count INTEGER,
    woke_up_count INTEGER,
    dreamed_count INTEGER
);




-- Constraint de unicidade para evitar duplicatas por semana e dia
ALTER TABLE sleep_data ADD CONSTRAINT unique_week_day UNIQUE (week, day_of_week);
ALTER SEQUENCE sleep_data_id_seq RESTART WITH 1






/*SELECT * from sleep_data
SELECT * from users
DELETE from sleep_Data
SELECT * FROM weekly_reports;
DELETE from weekly_reports

*/

export default Relatorio;