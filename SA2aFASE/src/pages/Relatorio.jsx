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

  // Buscar relatórios das semanas do backend
  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reports');
      setWeeklyReports(response.data);
    } catch (err) {
      console.error('Erro ao buscar relatórios:', err.message);
    }
  };

  useEffect(() => {
    fetchReports();  // Busca os relatórios ao carregar o componente
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
  
    return `Na semana ${weekNumber}, você dormiu em média ${average_hours_slept} horas, 
            consumiu ${average_coffee_cups} xícaras de café, 
            recebeu ${thumbsup_count} feedbacks positivos e teve ${thumbsdown_count} feedbacks negativos.`;
  };
  
  const handleGenerateReport = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/check-complete-week/${weekNumber}`);

        if (response.data.complete) {
            const reportResponse = await axios.post('http://localhost:3000/generate-weekly-report', { week: weekNumber });
            const reportData = reportResponse.data;

            setReportText(`
              Na semana ${weekNumber}, você dormiu em média ${reportData.average_hours_slept} horas por noite, 
sonhou ${reportData.dreamed_count} vezes e acordou durante a noite ${reportData.woke_up_count} vezes. 
A qualidade do seu sono foi predominantemente classificada como boa/ruim, refletindo a maior parte das noites. 
Durante a semana, você consumiu um total de ${reportData.average_coffee_cups} xícaras de café.
            `);
        } else {
            alert('A semana está incompleta. Faltam alguns dias de registros.');
        }
    } catch (error) {
        console.error('Erro ao gerar relatório:', error.message);
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

      {/* Renderiza o texto do relatório */}
      <p className="relatorio-texto">
        {reportText}
      </p>

      {/* Botão grande adicionado na parte inferior */}
      <button className="btn-gerar-relatorio" onClick={handleGenerateReport}>
        Gerar Relatório Detalhado
      </button>
      
    </div>
  </div>
</div>
  );
}

export default Relatorio;
