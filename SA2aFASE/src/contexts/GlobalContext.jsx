import React, { createContext, useState, useContext } from 'react';

// Criação do Contexto Global
const GlobalContext = createContext();

// Provider do contexto
const GlobalContextProvider = ({ children }) => {
  const [calendarData, setCalendarData] = useState({});

  // Função para atualizar os dados do calendário
  const updateCalendarData = (weekNumber, day, data) => {
    setCalendarData((prevData) => ({
      ...prevData,
      [`semana${weekNumber}`]: {
        ...prevData[`semana${weekNumber}`],
        [day]: data,
      },
    }));
  };

  return (
    <GlobalContext.Provider value={{ calendarData, updateCalendarData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para acessar o contexto
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider, useGlobalContext };
